import React from 'react';
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
  Box
} from '@mui/material';

function ProductoFormulario({
  newProduct,
  handleInputChange,
  handlePlatafromaChange,
  handleTipoProductoChange,
  handleImageChange,
  handleAddProduct,
  plataformasStats,
  tipoProductosStats,
  errorMessage,
  onCloseForm
}) {
  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h5" gutterBottom>Agregar Producto</Typography>
        <TextField
          label="Nombre del Producto"
          variant="outlined"
          fullWidth
          name="nom_producto"
          value={newProduct.nom_producto}
          onChange={handleInputChange}
          margin="normal"
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
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="platafroma-label">Plataforma</InputLabel>
          <Select
            labelId="platafroma-label"
            id="plataforma-select"
            name="id_plataforma"
            value={newProduct.id_plataforma}
            label="Platafroma"
            onChange={handlePlatafromaChange}
          >
            {plataformasStats.map((plataforma) => (
              <MenuItem key={plataforma.id_plataforma} value={plataforma.id_plataforma}>
                {plataforma.nom_plataforma}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
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
              <MenuItem key={tipoProducto.id_tipo_producto} value={tipoProducto.id_tipo_producto}>
                {tipoProducto.desc_producto}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Correo Asociado"
          variant="outlined"
          fullWidth
          name="correo_asociado"
          value={newProduct.correo_asociado}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          label="Contraseña Asociada"
          variant="outlined"
          fullWidth
          name="pass_asociada"
          value={newProduct.pass_asociada}
          onChange={handleInputChange}
          margin="normal"
          type="password"
        />
        <div>
          <label style={{ marginRight: '10px' }}>
            Seleccione la imagen del producto
          </label>
          <input
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleImageChange}
            style={{ margin: '16px 0' }}
          />
        </div>
        {errorMessage && (
          <Typography color="error" variant="body2" gutterBottom>
            {errorMessage}
          </Typography>
        )}
       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button onClick={onCloseForm} color="secondary" sx={{ mr: 2 }}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProduct}
            sx={{ mr: 2 }}
          >
            Guardar
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}

export default ProductoFormulario;