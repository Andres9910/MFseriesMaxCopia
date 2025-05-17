import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { addCategoria } from '../../api';

function CategoriaFormulario({
  onCloseForm,
  onCategoriaAdded,
}) {
  const [newCategoria, setNewCategoria] = useState({
    desc_producto: "",
    estado: 1,
  });
  const [uploadError, setUploadError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const showSuccessDialog = (message) => {
    setDialogMessage(message);
    setOpenDialog(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCategoria({ ...newCategoria, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: "" });
  };

  const handleGuardar = async () => {
    const errors = {};
    let isValid = true;

    if (!newCategoria.desc_producto?.trim()) {
      errors.desc_producto = "El nombre de la categoria es obligatorio.";
      isValid = false;
    }

    setValidationErrors(errors);

    if (isValid) {
      setUploadError(null);

      try {
        const addedCategoria = await addCategoria(newCategoria);
        if (addedCategoria) {
          setNewCategoria({
            desc_producto: "",
            estado: 1,
          });
          setValidationErrors({});
          showSuccessDialog("Producto guardado exitosamente.")
          onCategoriaAdded();
        } else {
          console.error(
            "Error al guardar la categoria (addedCategoria no devolvió datos)"
          );
          setUploadError("Error al guardar la categoria.");
        }
      } catch (error) {
        console.error("Error al guardar la categoria:", error);
        setUploadError("Error al guardar la categoria.");
        if (error.status == 409) {
          showSuccessDialog("Error al guardar la categoria: " + error.response.data.error)
        }
      }
    }
  };

  return (
    <>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleGuardar();
            }}
          >
            <Typography variant="h5" gutterBottom>
              Agregar Categoria
            </Typography>
            <TextField
              label="Nombre de la categoria"
              variant="outlined"
              fullWidth
              name="desc_producto"
              value={newCategoria.desc_producto}
              onChange={handleInputChange}
              margin="normal"
              error={validationErrors.desc_producto ? true : undefined}
              helperText={validationErrors.desc_producto}
            />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button onClick={onCloseForm} color="secondary" sx={{ mr: 2 }}>
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mr: 2 }}
              >
                Guardar
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          onCloseForm();
        }}
      >
        <DialogTitle>Mensaje</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
              onCloseForm();
            }}
            autoFocus
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CategoriaFormulario;