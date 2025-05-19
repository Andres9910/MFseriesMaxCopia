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
import {updateCategoria} from '../../api'

function CategoriasTabla({ categorias, onEdit, onDelete, onReload }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [categoriaToDelete, setCategoriaToDelete] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const showSuccessDialog = (message) => {
    setDialogMessage(message);
    setOpenDialog(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleToggleEstado = async (categoria) => {
      const nuevoEstado = categoria.estado === 1 ? 3 : 1;
      const categoriaId = categoria.id_tipo_producto;
      const categoriaActualizada = {
        ...categoria,
        estado: nuevoEstado,
        id_tipo_producto: categoriaId
      };
      try {
        const categoriaUpdate = await updateCategoria(categoriaId, categoriaActualizada);
  
        let mensaje = "";
        if (categoriaUpdate.estado === 3) {
          mensaje = "Categoria desactivada con éxito";
        } else if (categoriaUpdate.estado === 1) {
          mensaje = "Categoria activado con éxito";
        } else {
          mensaje = "Estado de la categoria actualizada";
        }
  
        showSuccessDialog(mensaje);
        onReload();
      } catch (error) {
        console.error("Error al actualizar el estado de la categoria", error);
      }
    };

  const filteredCategoria = categorias.filter((categoria) =>
    categoria.desc_producto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, categorias.length - page * rowsPerPage);

  return (
    <>
      <TextField
        label="Buscar categoria"
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
              <TableCell align="center">Categoria</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredCategoria.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredCategoria
            ).map((categoria) => (
              <TableRow
                key={categoria.id_tipo_producto}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {categoria.desc_producto}
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    color="primary"
                    aria-label="editar"
                    onClick={() => onEdit(categoria)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    aria-label="borrar"
                    onClick={() => {
                      setCategoriaToDelete(categoria.id_tipo_producto);
                      setConfirmOpen(true);
                    }}
                    style={{ marginLeft: "8px" }}
                  >
                    Borrar
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color={categoria.estado === 1 ? "warning" : "success"}
                    onClick={() => handleToggleEstado(categoria)}
                    style={{ marginLeft: "8px" }}
                  >
                    {categoria.estado === 1 ? "Desactivar" : "Activar"}
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
          count={categorias.length}
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
              ¿Estás seguro de que deseas eliminar esta categoria? Esta acción no
              se puede deshacer.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={() => {
                onDelete(categoriaToDelete);
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

export default CategoriasTabla;
