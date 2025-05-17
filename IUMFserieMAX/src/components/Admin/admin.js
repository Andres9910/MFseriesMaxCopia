import React, { useState, useEffect } from "react";
import {
  getProductById,
  getAllPlataformas,
  getAllTipoProducto,
  getProducts,
  removeProduct,
  getAdminStatistics,
  getRecargasStatistics,
  getProductosStatistics,
  getAllAdmins,
  updateProduct,
  getTipoProductoById,
  removeCategoria,
  updateCategoria
} from "./../../api";
import {
  Container,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useParams } from "react-router-dom";
import ProductosTabla from "../Products/ProductosTabla";
import ProductoFormulario from "../Products/ProductoFormulario";
import CategoriaFormulario from "../Categorias/CategoriaFormulario";
import ProductoEditarFormulario from "../Products/ProductoEditarFormulario";
import CategoriasTabla from "../Categorias/CategoriasTabla";
import CategoriaEditarFormulario from "../Categorias/CategoriaEditarFormulario";

const AdminDashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const { idAdmin } = useParams();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [newCategoria, setNewCategoria] = useState({});
  const [statistics, setStatistics] = useState({
    totalCompras: 0,
    totalRecargas: 0,
  });
  const [recargasStats, setRecargasStats] = useState([]);
  const [productosStats, setProductosStats] = useState([]);
  const [periodRecargas, setPeriodRecargas] = useState("daily");
  const [periodProducto, setPeriodProducto] = useState("daily");
  const [admins, setAdmins] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [plataformasStats, setPlatafromasStats] = useState([]);
  const [isFormProductoVisible, setIsFormProductoVisible] = useState(false);
  const [isFormCategoriaVisible, setIsFormCategoriaVisible] = useState(false);
  const [isTableProductoVisible, setIsTableProductoVisible] = useState(false);
  const [isTableCategoriaVisible, setIsTableCategoriaVisible] = useState(false);
  const [isEditFormProductoVisible, setIsEditFormProductoVisible] = useState(false);
  const [isEditFormCategoriaVisible, setIsEditFormCategoriaVisible] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);
    const [categoriaAEditar, setCategoriaAEditar] = useState(null);
  const [tipoProductoAEditar, setTipoProductoAEditar] = useState(null);

  const showSuccessDialog = (message) => {
    setDialogMessage(message);
    setOpenDialog(true);
  };

  const handleGuardarEditProducto = async (datosProductoActualizado) => {
    const productId = datosProductoActualizado.id_producto;

    try {
      const productUpdate = await updateProduct(
        productId,
        datosProductoActualizado
      );
      showSuccessDialog("Producto editado correctamente.");
      setProductoAEditar(productUpdate);
      setIsEditFormProductoVisible(false);
      setProductoAEditar(null);
      fetchProducts();
      handleInicial()
    } catch (error) {
      console.error("Error al obtener los detalles del producto:", error);
    }
  };

  const handleGuardarEditCategoria = async (datosCategoriaActualizado) => {
    const categoriaId = datosCategoriaActualizado.id_tipo_producto;

    try {
      const categoriaUpdate = await updateCategoria(
        categoriaId,
        datosCategoriaActualizado
      );
      showSuccessDialog("Categoria editada correctamente.");
      setCategoriaAEditar(categoriaUpdate);
      setIsEditFormProductoVisible(false);
      setCategoriaAEditar(null);
      fetchTipoProducts();
      handleInicial()
    } catch (error) {
      console.error("Error al obtener los detalles de la categoria:", error);
    }
  };

  const handleEditProduct = async (product) => {
    const productId = product.id_producto;
    try {
      const productDetails = await getProductById(productId, product);
      setProductoAEditar(productDetails);
      setIsEditFormProductoVisible(true);
      setIsTableProductoVisible(false)
      setIsTableCategoriaVisible(false)
    } catch (error) {
      console.error("Error al obtener los detalles del producto:", error);
    }
  };

  const handleEditCategoria = async (categoria) => {
    const tipProductId = categoria.id_tipo_producto;
    try {
      const tipoProductDetails = await getTipoProductoById(
        tipProductId,
        categoria
      );
      setCategoriaAEditar(tipoProductDetails);
      setIsEditFormCategoriaVisible(true);
      setIsTableProductoVisible(false)
      setIsTableCategoriaVisible(false)
    } catch (error) {
      console.error(
        "Error al obtener los detalles del tipo de producto:",
        error
      );
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await removeProduct(productId);
      fetchProducts();
      showSuccessDialog("Producto borrado correctamente.");
    } catch (error) {
      console.error("Error al quitar producto:", error);
    }
  };

  const handleDeleteCategoria = async (categoriatId) => {
    try {
      await removeCategoria(categoriatId);
      fetchTipoProducts();
      showSuccessDialog("categoria borrada correctamente.");
    } catch (error) {
      console.error("Error al quitar categoria:", error);
    }
  };

  const handleInicial = () => {
    setIsTableCategoriaVisible(true)
    setIsTableProductoVisible(true)
  };

  const handleShowFormProducto = () => {
    setIsFormProductoVisible(true);
    setIsTableProductoVisible(false)
    setIsTableCategoriaVisible(false)
    setIsFormCategoriaVisible(false);
  };
  const handleShowFormCategoria = () => {
    setIsFormCategoriaVisible(true);
    setIsFormProductoVisible(false);
    setIsTableProductoVisible(false)
    setIsTableCategoriaVisible(false)
  };

  const handleCloseFormProducto = () => {
    setIsFormProductoVisible(false);
    setIsTableProductoVisible(true)
    setIsTableCategoriaVisible(true)
    setIsFormCategoriaVisible(false);
    setIsEditFormProductoVisible(false);
    setNewProduct({});
    setErrorMessage("");
  };

  const handleCloseFormCategoria = () => {
    setIsFormProductoVisible(false);
    setIsFormCategoriaVisible(false);
    setIsTableProductoVisible(true)
    setIsTableCategoriaVisible(true)
    setIsEditFormCategoriaVisible(false);
    setNewCategoria({});
    setErrorMessage("");
  };

  const handleCloseEditFormProducto = () => {
    setIsEditFormProductoVisible(false);
    setIsTableProductoVisible(true)
    setIsTableCategoriaVisible(true)
    setProductoAEditar(null);
  };


  const fetchTipoProducts = async () => {
    try {
      const tipoProductsData = await getAllTipoProducto();
      setCategorias(tipoProductsData);
    } catch (error) {
      console.error("Error al obtener tipo de productos:", error);
    }
  };

  const fetchPlataformas = async () => {
    try {
      const plataformasData = await getAllPlataformas();
      setPlatafromasStats(plataformasData);
    } catch (error) {
      console.error("Error al obtener plataformas:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error("Error al obtener productos de api:", error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const statsData = await getAdminStatistics(idAdmin);
      setStatistics(statsData);
    } catch (error) {
      console.error("Error al obtener estadísticas:", error);
    }
  };

  const fetchRecargasStats = async () => {
    try {
      const statsData = await getRecargasStatistics(periodRecargas);
      setRecargasStats(statsData);
    } catch (error) {
      console.error("Error al obtener estadísticas de recargas:", error);
    }
  };

  const fetchProductosStats = async () => {
    try {
      const statsData = await getProductosStatistics(periodProducto);
      setProductosStats(statsData);
    } catch (error) {
      console.error("Error al obtener estadísticas de productos:", error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const adminsData = await getAllAdmins();
      setAdmins(adminsData);
    } catch (error) {
      console.error("Error al obtener administradores:", error);
    }
  };

  useEffect(() => {
    handleInicial()
    fetchProducts();
    fetchStatistics();
    fetchRecargasStats();
    fetchProductosStats();
    fetchAdmins();
    fetchTipoProducts();
    fetchPlataformas();
  }, [periodRecargas, periodProducto, idAdmin]);

  return (
    <>
      <Container sx={{ justifyContent: "center" }}>
        <Typography variant="h4" gutterBottom>
          Panel de Administración
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <Typography variant="h5" gutterBottom>
                Estadísticas
              </Typography>
              <Typography variant="body1">
                Ventas Anuales: {statistics.totalCompras}
              </Typography>
              <Typography variant="body1">
                Recargas Anuales: {statistics.totalRecargas}
              </Typography>
            </Paper>
          </Grid>

          {isTableProductoVisible && (
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleShowFormProducto}
              >
                Añadir Producto +
              </Button>
            </Grid>
          )}

          {isTableProductoVisible && (
            <Grid item xs={12}>
              <Paper elevation={3} style={{ padding: "16px" }}>
                <Typography variant="h5" gutterBottom>
                  Lista de Productos
                </Typography>
                <ProductosTabla
                  products={products}
                  plataformas={plataformasStats}
                  tiposProducto={categorias}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                  onReload={fetchProducts}
                />
              </Paper>
            </Grid>
          )}

          <Grid
            item
            xs={12}
            md={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {isFormProductoVisible && (
              <ProductoFormulario
                plataformasStats={plataformasStats}
                tipoProductosStats={categorias}
                onCloseForm={handleCloseFormProducto}
                onProductAdded={fetchProducts}
                onInicial={handleInicial}
              />
            )}
          </Grid>

          <Grid
            item
            xs={12}
            md={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {isEditFormProductoVisible && productoAEditar && (
              <ProductoEditarFormulario
                producto={productoAEditar}
                plataformasStats={plataformasStats}
                tipoProductosStats={categorias}
                errorMessage={errorMessage}
                onCloseEditForm={handleCloseEditFormProducto}
                handleGuardarCambios={handleGuardarEditProducto}
              />
            )}
          </Grid>

           {isTableCategoriaVisible && (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleShowFormCategoria}
                >
                  Añadir Categoria +
                </Button>
              </Grid>
            )}

            {isTableCategoriaVisible && (
              <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: "16px" }}>
                  <Typography variant="h5" gutterBottom>
                    Lista de Categorias
                  </Typography>
                  <CategoriasTabla
                    categorias={categorias}
                    onEdit={handleEditCategoria}
                    onDelete={handleDeleteCategoria}
                    onReload={fetchTipoProducts}
                  />
                </Paper>
              </Grid>
            )}

            <Grid
              item
              xs={12}
              md={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {isFormCategoriaVisible && (
                <CategoriaFormulario
                  onCloseForm={handleCloseFormCategoria}
                  onCategoriaAdded={fetchTipoProducts}
                />
              )}
            </Grid>

          <Grid
            item
            xs={12}
            md={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {isEditFormCategoriaVisible && categoriaAEditar && (
              <CategoriaEditarFormulario
                categoria={categoriaAEditar}
                plataformasStats={plataformasStats}
                errorMessage={errorMessage}
                onCloseEditForm={handleCloseFormCategoria}
                handleGuardarCambios={handleGuardarEditCategoria}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <Typography variant="h5" gutterBottom>
                Estadísticas de Recargas
              </Typography>
              <Select
                value={periodRecargas}
                onChange={(e) => setPeriodRecargas(e.target.value)}
              >
                <MenuItem value="daily">Hoy</MenuItem>
                <MenuItem value="weekly">En la ultima semana</MenuItem>
                <MenuItem value="monthly">En el ultimo mes</MenuItem>
              </Select>
              <List>
                <ListItem>
                  <ListItemText
                    primary={`Total de Recargas: ${recargasStats.totalRecargas}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Suma de Montos Recargados: $${recargasStats.sumaMontoRecargado}`}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <Typography variant="h5" gutterBottom>
                Estadísticas de Productos Vendidos
              </Typography>
              <Select
                value={periodProducto}
                onChange={(e) => setPeriodProducto(e.target.value)}
              >
                <MenuItem value="daily">Hoy</MenuItem>
                <MenuItem value="weekly">En la ultima semana</MenuItem>
                <MenuItem value="monthly">En el ultimo mes</MenuItem>
              </Select>
              <List>
                <ListItem>
                  <ListItemText
                    primary={`Total de Productos: ${productosStats.totalProductosVendidos}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Suma de Montos de ventas de productos: $${productosStats.sumaMontoProductosVendidos}`}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <Typography variant="h5" gutterBottom>
                Administradores Registrados
              </Typography>
              <List>
                {admins.map((admin) => (
                  <ListItem key={admin.id_admin}>
                    <ListItemText
                      primary={`Nombre: ${admin.nom_admin}, Correo: ${admin.email_admin}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Mensaje</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminDashboard;
