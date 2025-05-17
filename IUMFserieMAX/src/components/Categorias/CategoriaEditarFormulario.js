import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';

function CategoriaEditarFormulario({
  categoria,
  onCloseEditForm,
  handleGuardarCambios
}) {
  const [editedCategoria, setEditedCategoria] = useState({ ...categoria });
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedCategoria({ ...editedCategoria, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const handleGuardar = async () => {
    try {
      const errors = {};
      let isValid = true;

      if (!editedCategoria.desc_producto) {
        errors.desc_producto = "El nombre de la categoria es obligatorio.";
        isValid = false;
      }

      setValidationErrors(errors);

      if (isValid) {
        handleGuardarCambios(editedCategoria);
      } else {
        setValidationErrors(errors);
      }
    } catch (error) {
      console.error("Error al añadir categoria:", error);
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
              Editar Categoria
            </Typography>
            <TextField
              label="Nombre de la categoria"
              variant="outlined"
              fullWidth
              name="desc_producto"
              value={editedCategoria.desc_producto || ""}
              onChange={handleInputChange}
              margin="normal"
              error={!!validationErrors.desc_producto}
              helperText={validationErrors.desc_producto}
            />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                onClick={onCloseEditForm}
                color="secondary"
                sx={{ mr: 2 }}
              >
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
    </>
  );
}

export default CategoriaEditarFormulario;