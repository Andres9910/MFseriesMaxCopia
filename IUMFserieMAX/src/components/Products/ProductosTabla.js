import React, {useState} from 'react';
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
} from '@mui/material';

function ProductosTabla({ products, onEdit, onDelete }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Plataforma ID</TableCell>
            <TableCell align="right">Tipo Producto ID</TableCell>
            <TableCell align="center">Imagen</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : products
          ).map((product) => (
            <TableRow
              key={product.id_producto}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.nom_producto}
              </TableCell>
              <TableCell align="right">
                {product.precio_producto}
              </TableCell>
              <TableCell align="right">
                {product.id_plataforma}
              </TableCell>
              <TableCell align="right">
                {product.id_tipo_producto}
              </TableCell>
              <TableCell align="center">
                {product.imagen && (
                  <img
                    src={product.imagen.startsWith('data:image') ? product.imagen : `data:image/png;base64,${product.imagen}`}
                    alt={product.nom_producto}
                    style={{ maxWidth: '50px', maxHeight: '50px' }}
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
                  onClick={() => onDelete(product.id_producto)}
                  style={{ marginLeft: '8px' }}
                >
                  Borrar
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
        rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
        colSpan={6}
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: {
            'aria-label': 'filas por página',
          },
          native: true,
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        // ActionsComponent={() => <></>}
      />
    </TableContainer>
  );
}

export default ProductosTabla;