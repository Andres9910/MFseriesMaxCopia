import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { addProduct } from '../../api';

function ProductoFormulario({
  plataformasStats,
  tipoProductosStats,
  onCloseForm,
  onProductAdded,
  onInicial
}) {
  const [newProduct, setNewProduct] = useState({
    nom_producto: "",
    precio_producto: "",
    id_plataforma: "",
    id_tipo_producto: "",
    correo_asociado: "",
    password_asociado: "",
    imagen: "",
    estado: 1,
  });
  const [uploadingImage, setUploadingImage] = useState(false);
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
    setNewProduct({ ...newProduct, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: "" });
  };

  const handlePlatafromaChange = (event) => {
    setNewProduct({ ...newProduct, id_plataforma: event.target.value });
    setValidationErrors({ ...validationErrors, id_plataforma: "" });
  };

  const handleTipoProductoChange = (event) => {
    setNewProduct({ ...newProduct, id_tipo_producto: event.target.value });
    setValidationErrors({ ...validationErrors, id_tipo_producto: "" });
  };

  const handleLocalImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Eliminar el prefijo data:image/...;base64,
        const base64Data = base64String.substring(
          base64String.indexOf(",") + 1
        );
        setNewProduct({ ...newProduct, imagen: base64Data });
        setValidationErrors({ ...validationErrors, imagen: "" });
      };
      reader.onerror = () => {
        console.error("Error al leer la imagen.");
        setValidationErrors({
          ...validationErrors,
          imagen: "Error al leer la imagen.",
        });
      };
      reader.readAsDataURL(file);
    } else {
      setNewProduct({ ...newProduct, imagen: "" });
    }
  };

  const handleGuardar = async () => {
    const errors = {};
    let isValid = true;

    if (!newProduct.nom_producto?.trim()) {
      errors.nom_producto = "El nombre del producto es obligatorio.";
      isValid = false;
    }
    if (!newProduct.precio_producto?.trim()) {
      errors.precio_producto = "El precio del producto es obligatorio.";
      isValid = false;
    }
    if (!newProduct.id_plataforma) {
      errors.id_plataforma = "La plataforma es obligatoria.";
      isValid = false;
    }
    if (!newProduct.id_tipo_producto) {
      errors.id_tipo_producto = "El tipo de producto es obligatorio.";
      isValid = false;
    }
    if (!newProduct.correo_asociado?.trim()) {
      errors.correo_asociado = "El correo asociado es obligatorio.";
      isValid = false;
    }
    if (!newProduct.password_asociado?.trim()) {
      errors.password_asociado = "La contraseña asociada es obligatoria.";
      isValid = false;
    }
    if (newProduct.imagen == "") {
      errors.imagen = "La imagen del producto es obligatoria.";
      isValid = false;
    }

    setValidationErrors(errors);

    if (isValid) {
      setUploadingImage(true);
      setUploadError(null);

      try {
        const addedProduct = await addProduct(newProduct);
        if (addedProduct) {
          setUploadingImage(false);
          setNewProduct({
            nom_producto: "",
            precio_producto: "",
            id_plataforma: "",
            id_tipo_producto: "",
            correo_asociado: "",
            password_asociado: "",
            imagen: "",
            estado: 1,
          });
          setValidationErrors({});
          showSuccessDialog("Producto guardado exitosamente.")
          onProductAdded();
          onInicial()
        } else {
          console.error(
            "Error al guardar el producto (addProduct no devolvió datos)"
          );
          setUploadError("Error al guardar el producto.");
          setUploadingImage(false);
        }
      } catch (error) {
        console.error("Error al guardar el producto:", error);
        setUploadError("Error al guardar el producto.");
        setUploadingImage(false);
        if (error.status == 409) {
          showSuccessDialog("Error al guardar la categoria: " + error.response.data.error)
        }
      }
    } else {
      setUploadingImage(false);
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
              Agregar Producto
            </Typography>
            <TextField
              label="Nombre del Producto"
              variant="outlined"
              fullWidth
              name="nom_producto"
              value={newProduct.nom_producto}
              onChange={handleInputChange}
              margin="normal"
              error={validationErrors.nom_producto ? true : undefined}
              helperText={validationErrors.nom_producto}
            />
            <TextField
              label="Precio del Producto"
              variant="outlined"
              fullWidth
              name="precio_producto"
              type="number"
              value={newProduct.precio_producto}
              onChange={handleInputChange}
              margin="normal"
              error={validationErrors.precio_producto ? true : undefined}
              helperText={validationErrors.precio_producto}
            />

            <FormControl
              fullWidth
              margin="normal"
              error={!!validationErrors.id_plataforma}
            >
              <InputLabel id="platafroma-label">Plataforma</InputLabel>
              <Select
                labelId="platafroma-label"
                id="plataforma-select"
                name="id_plataforma"
                value={newProduct.id_plataforma}
                label="Plataforma"
                onChange={handlePlatafromaChange}
              >
                {plataformasStats.map((plataforma) => (
                  <MenuItem
                    key={plataforma.id_plataforma}
                    value={plataforma.id_plataforma}
                  >
                    {plataforma.nom_plataforma}
                  </MenuItem>
                ))}
              </Select>
              {validationErrors.id_plataforma && (
                <FormHelperText>
                  {validationErrors.id_plataforma}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              margin="normal"
              error={!!validationErrors.id_tipo_producto}
            >
              <InputLabel id="tipo-producto-label">Tipo de Producto</InputLabel>
              <Select
                labelId="tipo-producto-label"
                id="tipo-producto-select"
                name="id_tipo_producto"
                value={newProduct.id_tipo_producto}
                label="Tipo de Producto"
                onChange={handleTipoProductoChange}
              >
                {tipoProductosStats.map((tipoProducto) => (
                  <MenuItem
                    key={tipoProducto.id_tipo_producto}
                    value={tipoProducto.id_tipo_producto}
                  >
                    {tipoProducto.desc_producto}
                  </MenuItem>
                ))}
              </Select>
              {validationErrors.id_tipo_producto && (
                <FormHelperText>
                  {validationErrors.id_tipo_producto}
                </FormHelperText>
              )}
            </FormControl>
            <TextField
              label="Correo Asociado"
              variant="outlined"
              fullWidth
              name="correo_asociado"
              value={newProduct.correo_asociado}
              onChange={handleInputChange}
              margin="normal"
              autoComplete="username"
              error={validationErrors.correo_asociado ? true : undefined}
              helperText={validationErrors.correo_asociado}
            />

            <TextField
              label="Contraseña Asociada"
              variant="outlined"
              fullWidth
              name="password_asociado"
              value={newProduct.password_asociado}
              onChange={handleInputChange}
              margin="normal"
              type="password"
              autoComplete="current-password"
              error={validationErrors.password_asociado ? true : undefined}
              helperText={validationErrors.password_asociado}
            />

            <div>
              <label style={{ marginRight: "10px" }}>
                Seleccione la imagen del producto
              </label>
              <input
                type="file"
                name="imagen"
                accept="image/*"
                onChange={handleLocalImageChange}
                style={{
                  marginTop: "8px",
                  border: validationErrors.imagen ? "1px solid red" : undefined,
                  padding: "6px",
                  borderRadius: "4px",
                }}
              />
              <div>
                <label style={{ color: "red" }}>
                  {validationErrors.imagen
                    ? "La imagen del producto es obligatoria."
                    : ""}
                </label>
              </div>
            </div>
            {uploadError && (
              <Typography color="error" variant="body2" gutterBottom>
                {uploadError}
              </Typography>
            )}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button onClick={onCloseForm} color="secondary" sx={{ mr: 2 }}>
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mr: 2 }}
                disabled={uploadingImage}
              >
                {uploadingImage ? "Guardando..." : "Guardar"}
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

export default ProductoFormulario;