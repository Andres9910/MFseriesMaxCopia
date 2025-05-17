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
  FormHelperText
} from '@mui/material';

function ProductoEditarFormulario({
  producto,
  plataformasStats,
  tipoProductosStats,
  errorMessage,
  onCloseEditForm,
  handleGuardarCambios
}) {
  const [editedProduct, setEditedProduct] = useState({ ...producto });
  const [localImage, setLocalImage] = useState(null);
  const [imageToDelete, setImageToDelete] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct({ ...editedProduct, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const handlePlataformaChange = (event) => {
    setEditedProduct({ ...editedProduct, id_plataforma: event.target.value });
    setValidationErrors({ ...validationErrors, id_plataforma: '' });
  };

  const handleTipoProductoChange = (event) => {
    setEditedProduct({ ...editedProduct, id_tipo_producto: event.target.value });
    setValidationErrors({ ...validationErrors, id_tipo_producto: '' });
  };

  const handleImageChangeLocal = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Eliminar el prefijo data:image/...;base64,
        const base64Data = base64String.substring(base64String.indexOf(',') + 1);
        setEditedProduct({ ...editedProduct, imagen: base64Data });
        setValidationErrors({ ...validationErrors, imagen: '' });
      };
      reader.onerror = () => {
        console.error('Error al leer la imagen.');
        setValidationErrors({ ...validationErrors, imagen: 'Error al leer la imagen.' });
      };
      reader.readAsDataURL(file);
    } else {
      setEditedProduct({ ...editedProduct, imagen: '' });
    }
  };

  const handleEliminarImagen = () => {
    setLocalImage(null);
    setImageToDelete(true);
    setEditedProduct({...editedProduct, imagen: null})
  };

  const handleGuardar = async () => {
    try {
      const errors = {};
      let isValid = true;

      if (!editedProduct.nom_producto) {
        errors.nom_producto = "El nombre del producto es obligatorio.";
        isValid = false;
      }
      if (!editedProduct.precio_producto) {
        errors.precio_producto = "El precio del producto es obligatorio.";
        isValid = false;
      }
      if (!editedProduct.id_plataforma) {
        errors.id_plataforma = "La plataforma es obligatoria.";
        isValid = false;
      }
      if (!editedProduct.id_tipo_producto) {
        errors.id_tipo_producto = "El tipo de producto es obligatorio.";
        isValid = false;
      }
      if (!editedProduct.correo_asociado) {
        errors.correo_asociado = "El correo asociado es obligatorio.";
        isValid = false;
      }
      if (!editedProduct.password_asociado) {
        errors.password_asociado = "La contraseña asociada es obligatoria.";
        isValid = false;
      }
      if (editedProduct.imagen == null) {
        errors.imagen = "La imagen del producto es obligatoria.";
        isValid = false;
      }

      setValidationErrors(errors);

      if (isValid) {
        let imageDataToSend = editedProduct.imagen;
        if (
          typeof imageDataToSend === "string" &&
          imageDataToSend.startsWith("data:image")
        ) {
          const commaIndex = imageDataToSend.indexOf(",");
          if (commaIndex > -1) {
            imageDataToSend = imageDataToSend.substring(commaIndex + 1);
          }
        }
        const finalProductData = { ...editedProduct, imagen: imageDataToSend };
        handleGuardarCambios(finalProductData);
      } else {
        setValidationErrors(errors);
      }
    } catch (error) {
      console.error("Error al añadir producto:", error);
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
              Editar Producto
            </Typography>
            <TextField
              label="Nombre del Producto"
              variant="outlined"
              fullWidth
              name="nom_producto"
              value={editedProduct.nom_producto || ""}
              onChange={handleInputChange}
              margin="normal"
              error={!!validationErrors.nom_producto}
              helperText={validationErrors.nom_producto}
            />
            <TextField
              label="Precio del Producto"
              variant="outlined"
              fullWidth
              name="precio_producto"
              type="number"
              value={editedProduct.precio_producto || ""}
              onChange={handleInputChange}
              margin="normal"
              error={!!validationErrors.precio_producto}
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
                value={editedProduct.id_plataforma || ""}
                label="Platafroma"
                onChange={handlePlataformaChange}
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
                value={editedProduct.id_tipo_producto || ""}
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
              value={editedProduct.correo_asociado || ""}
              onChange={handleInputChange}
              margin="normal"
              autoComplete="username"
              error={!!validationErrors.correo_asociado}
              helperText={validationErrors.correo_asociado}
            />
            <TextField
              label="Contraseña Asociada"
              variant="outlined"
              fullWidth
              name="password_asociado"
              value={editedProduct.password_asociado || ""}
              onChange={handleInputChange}
              margin="normal"
              type="password"
              autoComplete="current-password"
              error={!!validationErrors.password_asociado}
              helperText={validationErrors.password_asociado}
            />
            {producto.imagen && !localImage && !imageToDelete && (
              <div>
                <img
                  src={
                    producto.imagen.startsWith("data:image")
                      ? producto.imagen
                      : `data:image/png;base64,${producto.imagen}`
                  }
                  alt={producto.nom_producto}
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    marginBottom: "10px",
                  }}
                />
                <Button
                  size="small"
                  color="secondary"
                  onClick={handleEliminarImagen}
                  sx={{ display: "block", marginBottom: "10px" }}
                >
                  Eliminar Imagen
                </Button>
              </div>
            )}

            {(localImage || !producto.imagen || imageToDelete) && (
              <div>
                {localImage && (
                  <img
                    src={URL.createObjectURL(localImage)} // Previsualizar la imagen local
                    alt="Nueva imagen del producto"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      marginBottom: "10px",
                    }}
                  />
                )}
                <label style={{ marginRight: "10px" }}>
                  {localImage
                    ? "Reemplazar imagen del producto"
                    : "Seleccione la imagen del producto"}
                </label>
                <input
                  type="file"
                  name="imagen"
                  accept="image/*"
                  onChange={handleImageChangeLocal}
                  style={{
                    marginTop: "8px",
                    border: validationErrors.imagen
                      ? "1px solid red"
                      : undefined,
                    padding: "6px",
                    borderRadius: "4px",
                  }}
                />
                <div>
                  <label style={{ color: "red" }}>
                    {!!validationErrors.imagen
                      ? "La imagen del producto es obligatoria."
                      : ""}
                  </label>
                </div>
              </div>
            )}
            {errorMessage && (
              <Typography color="error" variant="body2" gutterBottom>
                {errorMessage}
              </Typography>
            )}
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

export default ProductoEditarFormulario;