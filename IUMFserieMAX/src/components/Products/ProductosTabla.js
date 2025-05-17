import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {updateProduct} from '../../api'

function ProductosTabla({ products, plataformas, tiposProducto, onEdit, onDelete, onReload }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const showSuccessDialog = (message) => {
    setDialogMessage(message);
    setOpenDialog(true);
  };

  const getNombrePlataforma = (id) => {
    const plataforma = plataformas.find((p) => p.id_plataforma === id);
    return plataforma ? plataforma.nom_plataforma : "Desconocido";
  };

  const getNombreTipoProducto = (id) => {
    const tipo = tiposProducto.find((t) => t.id_tipo_producto === id);
    return tipo ? tipo.desc_producto : "Desconocido";
  };

  const filteredProducts = products.filter(product =>
    product.nom_producto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleToggleEstado = async (product) => {
    const nuevoEstado = product.estado === 1 ? 3 : 1;
    const productId = product.id_producto;
    let imageDataToSend = product.imagen;
    if (
      typeof imageDataToSend === "string" &&
      imageDataToSend.startsWith("data:image")
    ) {
      const commaIndex = imageDataToSend.indexOf(",");
      if (commaIndex > -1) {
        imageDataToSend = imageDataToSend.substring(commaIndex + 1);
      }
    }

    const productoActualizado = {
      ...product,
      estado: nuevoEstado,
      id_producto: productId,
      imagen: imageDataToSend,
    };
    try {
      const productUpdate = await updateProduct(productId, productoActualizado);

      let mensaje = "";
      if (productUpdate.estado === 3) {
        mensaje = "Producto desactivado con éxito";
      } else if (productUpdate.estado === 1) {
        mensaje = "Producto activado con éxito";
      } else {
        mensaje = "Estado del producto actualizado";
      }

      showSuccessDialog(mensaje);
      onReload();
    } catch (error) {
      console.error("Error al actualizar el estado del producto", error);
    }
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

  return (
    <>
      <TextField
        label="Buscar producto"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(0); // Reiniciar página al buscar
        }}
        style={{ marginBottom: 20, width: 300 }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Precio</TableCell>
              <TableCell align="center">Plataforma</TableCell>
              <TableCell align="center">Tipo Producto</TableCell>
              <TableCell align="center">Imagen</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredProducts.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredProducts
            ).map((product) => (
              <TableRow
                key={product.id_producto}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {product.nom_producto}
                </TableCell>
                <TableCell align="center">{product.precio_producto}</TableCell>
                <TableCell align="center">
                  {getNombrePlataforma(product.id_plataforma)}
                </TableCell>
                <TableCell align="center">
                  {getNombreTipoProducto(product.id_tipo_producto)}
                </TableCell>
                <TableCell align="center">
                  {product.imagen && (
                    <img
                      src={
                        product.imagen.startsWith("data:image")
                          ? product.imagen
                          : `data:image/png;base64,${product.imagen}`
                      }
                      alt={product.nom_producto}
                      style={{ maxWidth: "50px", maxHeight: "50px" }}
                    />
                  )}
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    color="primary"
                    aria-label="editar"
                    onClick={() => onEdit(product)}
                  >
                    Editar
                  </Button>

                  <Button
                    size="small"
                    color="secondary"
                    aria-label="borrar"
                    onClick={() => {
                      setProductToDelete(product.id_producto);
                      setConfirmOpen(true);
                    }}
                    style={{ marginLeft: "8px" }}
                  >
                    Borrar
                  </Button>

                  <Button
                    size="small"
                    variant="outlined"
                    color={
                      product.estado === 1 ? "warning" : "success"
                    }
                    onClick={() => handleToggleEstado(product)}
                    style={{ marginLeft: "8px" }}
                  >
                    {product.estado === 1 ? "Desactivar" : "Activar"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
          colSpan={6}
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "filas por página",
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          // ActionsComponent={() => <></>}
        />
        <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <DialogTitle>¿Confirmar eliminación?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro de que deseas eliminar este producto? Esta acción no
              se puede deshacer.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={() => {
                onDelete(productToDelete);
                setConfirmOpen(false);
              }}
              color="secondary"
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </>
  );
}

export default ProductosTabla;
