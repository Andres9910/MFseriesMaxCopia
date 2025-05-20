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
  TextField,
} from "@mui/material";

function VentasTabla({ compras }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredCompras = compras.filter((compra) =>
    compra.nom_producto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, compras.length - page * rowsPerPage);

  return (
    <>
      <TextField
        label="Buscar Producto"
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
              <TableCell align="center">Producto</TableCell>
              <TableCell align="center">Fecha de la compra</TableCell>
              <TableCell align="center">Precio del producto</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Total de la compra</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredCompras.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredCompras
            ).map((compra) => (
              <TableRow
                key={compra.id_compra}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {compra.nom_producto}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {formatearFecha(compra.fecha_compra)}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {compra.precio_producto}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {compra.cantidad}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {compra.precio_total}
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
          count={compras.length}
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
        />
      </TableContainer>
    </>
  );
}

export default VentasTabla;
