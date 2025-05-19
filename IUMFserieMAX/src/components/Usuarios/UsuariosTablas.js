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
import {updateUserByDesactivate} from '../../api'

function UsuariosTabla({ usuarios, onEdit, onDelete, onReload }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [usuarioToDelete, setUsuarioToDelete] = useState(null);

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

  const handleToggleEstado = async (usuario) => {
      const nuevoEstado = usuario.estado === 1 ? 3 : 1;
      const usuarioId = usuario.id_usuario;
      const usuarioActualizada = {
        ...usuario,
        estado: nuevoEstado,
        id_usuario: usuarioId
      };
      try {
        const usuarioUpdate = await updateUserByDesactivate(usuarioId, usuarioActualizada);
  
        let mensaje = "";
        if (usuarioUpdate.estado === 3) {
          mensaje = "Usuario desactivado con éxito";
        } else if (usuarioUpdate.estado === 1) {
          mensaje = "Usuario activado con éxito";
        } else {
          mensaje = "Estado del usuario actualizado";
        }
  
        showSuccessDialog(mensaje);
        onReload();
      } catch (error) {
        console.error("Error al actualizar el estado del usuario", error);
      }
    };

  const filteredUsuario = usuarios.filter((usuario) =>
    usuario.nom_usuario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, usuarios.length - page * rowsPerPage);

  return (
    <>
      <TextField
        label="Buscar Usuario"
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
              <TableCell align="center">Usuario</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredUsuario.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredUsuario
            ).map((usuario) => (
              <TableRow
                key={usuario.id_usuario}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {usuario.nom_usuario}
                </TableCell>
                <TableCell align="center">
                  {/* <Button
                    size="small"
                    color="primary"
                    aria-label="editar"
                    onClick={() => onEdit(usuario)}
                  >
                    Editar
                  </Button> */}
                  {/* <Button
                    size="small"
                    color="secondary"
                    aria-label="borrar"
                    onClick={() => {
                      setUsuarioToDelete(usuario.id_usuario);
                      setConfirmOpen(true);
                    }}
                    style={{ marginLeft: "8px" }}
                  >
                    Borrar
                  </Button> */}
                  <Button
                    size="small"
                    variant="outlined"
                    color={usuario.estado === 1 ? "warning" : "success"}
                    onClick={() => handleToggleEstado(usuario)}
                    style={{ marginLeft: "8px" }}
                  >
                    {usuario.estado === 1 ? "Desactivar" : "Activar"}
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
          count={usuarios.length}
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
              ¿Estás seguro de que deseas eliminar este usuario? Esta acción no
              se puede deshacer.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={() => {
                onDelete(usuarioToDelete);
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

export default UsuariosTabla;
