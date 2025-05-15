import React, { useState, useEffect } from "react";
import {
  removeCategoria,
  getTipoProductoById,
  getProductById,
  getAllPlataformas,
  getAllTipoProducto,
  getProducts,
  addProduct,
  removeProduct,
  getAdminStatistics,
  getRecargasStatistics,
  getProductosStatistics,
  getAllAdmins,
  updateProduct
} from "./../../api";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useParams } from "react-router-dom";
import ProductosTabla from "../Products/ProductosTabla";
import ProductoFormulario from "../Products/ProductoFormulario";
import ProductoEditarFormulario from "../Products/ProductoEditarFormulario";
import CategoriasTabla from "../Categorias/CategoriasTabla";

const AdminDashboard = () => {
  const { idAdmin } = useParams();
  const [products, setProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nom_producto: "",
    precio_producto: "",
    id_plataforma: "",
    id_tipo_producto: "",
    correo_asociado: "",
    pass_asociada: "",
    imagen: null,
    estado: 1,
  });
  const [statistics, setStatistics] = useState({ sales: 0, recharges: 0 });
  const [recargasStats, setRecargasStats] = useState([]);
  const [productosStats, setProductosStats] = useState([]);
  const [productStats, setProductStats] = useState([]);
  const [period, setPeriod] = useState("daily");
  const [admins, setAdmins] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [tipoProductosStats, setTipoProductosStats] = useState([]);
  const [plataformasStats, setPlatafromasStats] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isAgregarFormVisible, setIsAgregarFormVisible] = useState(false);
  const [isEditarFormVisible, setIsEditarFormVisible] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);

  const handleEditNameInputChange = (event) => {
    setProductoAEditar({ ...productoAEditar, nom_producto: event.target.value });
  };

  const handleEditPriceInputChange = (event) => {
    setProductoAEditar({ ...productoAEditar, precio_producto: event.target.value });
  };

  const handleEditPlataformaChange = (event) => {
    setProductoAEditar({ ...productoAEditar, id_plataforma: event.target.value });
  };

  const handleEditTipoProductoChange = (event) => {
    setProductoAEditar({ ...productoAEditar, id_tipo_producto: event.target.value });
  };

  const handleEditCorreoAsociadoChange = (event) => {
    setProductoAEditar({ ...productoAEditar, correo_asociado: event.target.value });
  };

  const handleEditPasswordAsociadoChange = (event) => {
    setProductoAEditar({ ...productoAEditar, password_asociado: event.target.value });
  };

  const handleEditImageChange = (event) => {
    // Aquí puedes manejar la carga de la nueva imagen si necesitas preprocesarla
    // o simplemente pasar el evento al componente hijo.
    // Si solo lo pasas, no necesitas esta función aquí.
    console.log('Imagen cambiada para edición:', event.target.files[0]);
  };

  const handleGuardarCambios = async (datosProductoActualizado) => {
    const productId = datosProductoActualizado.id_producto;

    try {
      const productUpdate = await updateProduct(productId,datosProductoActualizado);
      setProductoAEditar(productUpdate);
      setIsEditFormVisible(false);
      setProductoAEditar(null);
      fetchProducts();
    } catch (error) {
      console.error("Error al obtener los detalles del producto:", error);
    }
  };

  const handleCloseEditForm = () => {
    setIsEditFormVisible(false);
    setProductoAEditar(null);
  };

  const handleEditProduct = async (product) => {
    const productId = product.id_producto;
    try {
      const productDetails = await getProductById(productId,product);
      setProductoAEditar(productDetails);
      setIsEditFormVisible(true);
    } catch (error) {
      console.error("Error al obtener los detalles del producto:", error);
    }
  };

  const handleEditCategoria = async (categoria) => {
    const categoriaId = categoria.id_producto;
    try {
      const categoriaDetails = await getTipoProductoById(categoriaId,categoria);
      setProductoAEditar(categoriaDetails);
      setIsEditFormVisible(true);
    } catch (error) {
      console.error("Error al obtener los detalles del producto:", error);
    }
  };

  const handleShowForm = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    // Opcional: Resetear el estado del formulario si lo deseas
    setNewProduct({
      /* ... estado inicial ... */
    });
    setErrorMessage("");
  };

  const fetchProductById = async (productId) => {
    try {
      const productsByIdData = await getProductById(productId);
      setProductStats(productsByIdData);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  const fetchTipoProducts = async () => {
    try {
      const tipoProductsData = await getAllTipoProducto();
      setTipoProductosStats(tipoProductsData);
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
      const statsData = await getRecargasStatistics(period);
      setRecargasStats(statsData);
    } catch (error) {
      console.error("Error al obtener estadísticas de recargas:", error);
    }
  };

  const fetchProductosStats = async () => {
    try {
      const statsData = await getProductosStatistics(period);
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
    fetchProducts();
    fetchStatistics();
    fetchRecargasStats();
    fetchProductosStats();
    fetchAdmins();
    fetchTipoProducts();
    fetchPlataformas();
  }, [period, idAdmin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleTipoProductoChange = (event) => {
    setNewProduct((prevState) => ({
      ...prevState,
      id_tipo_producto: event.target.value,
    }));
  };

  const handlePlatafromaChange = (event) => {
    setNewProduct((prevState) => ({
      ...prevState,
      id_plataforma: event.target.value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Divide la cadena en la coma y toma la segunda parte
        const base64Data = base64String.split(",")[1];
        setNewProduct((prevState) => ({
          ...prevState,
          imagen: base64Data, // Guarda solo la parte de los datos Base64
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setNewProduct((prevState) => ({
        ...prevState,
        imagen: null,
      }));
    }
  };

  const handleAddProduct = async () => {
    const {
      nom_producto,
      precio_producto,
      id_plataforma,
      id_tipo_producto,
      correo_asociado,
      pass_asociada,
      imagen,
      estado,
    } = newProduct;

    // Verificación de campos vacíos
    let hasError = false;
    let errorMessage = "";

    if (!nom_producto?.trim()) {
      errorMessage = "El nombre del producto es obligatorio.";
      hasError = true;
    } else if (!precio_producto?.trim()) {
      errorMessage = "El precio del producto es obligatorio.";
      hasError = true;
    } else if (!id_plataforma) {
      errorMessage = "La plataforma es obligatoria.";
      hasError = true;
    } else if (!id_tipo_producto) {
      errorMessage = "El tipo de producto es obligatorio.";
      hasError = true;
    } else if (!correo_asociado?.trim()) {
      errorMessage = "El correo asociado es obligatorio.";
      hasError = true;
    } else if (!pass_asociada?.trim()) {
      errorMessage = "La contraseña asociada es obligatoria.";
      hasError = true;
    } else if (!imagen) {
      errorMessage = "La imagen del producto es obligatoria.";
      hasError = true;
    }

    if (hasError) {
      setErrorMessage(errorMessage);
      return;
    }

    try {
      const addedProduct = await addProduct(newProduct);
      setProducts([...products, addedProduct]);
      setNewProduct({
        nom_producto: "",
        precio_producto: "",
        id_plataforma: "",
        id_tipo_producto: "",
        correo_asociado: "",
        pass_asociada: "",
        imagen: null,
        estado: 1,
      });
      setErrorMessage("");
      alert("Producto guardado exitosamente.");
    } catch (error) {
      console.error("Error al añadir producto:", error);
      setErrorMessage(
        "Error al añadir el producto. Por favor, inténtelo de nuevo."
      );
      alert("Error al añadir el producto. Por favor, inténtelo de nuevo.");
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      await removeProduct(productId);
      setProducts(products.filter((p) => p._id !== productId));
    } catch (error) {
      console.error("Error al quitar producto:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await removeProduct(productId);
      //actualizar los productos
      fetchProducts();
      alert("Producto borrado correctamente.");
    } catch (error) {
      console.error("Error al quitar producto:", error);
    }
  };

  const handleDeleteCategoria = async (categoriaId) => {
    try {
      await removeCategoria(categoriaId);
      fetchTipoProducts();
      alert("Categoria borrada correctamente.");
    } catch (error) {
      console.error("Error al quitar categoria:", error);
    }
  };

  return (
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

        <Grid
          item
          xs={12}
          md={12}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {isFormVisible && (
            <ProductoFormulario
              newProduct={newProduct}
              handleInputChange={handleInputChange}
              handlePlatafromaChange={handlePlatafromaChange}
              handleTipoProductoChange={handleTipoProductoChange}
              handleImageChange={handleImageChange}
              handleAddProduct={handleAddProduct}
              plataformasStats={plataformasStats}
              tipoProductosStats={tipoProductosStats}
              errorMessage={errorMessage}
              onCloseForm={handleCloseForm}
            />
          )}
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {isEditFormVisible && productoAEditar && (
            <ProductoEditarFormulario
              producto={productoAEditar}
              handleNameInputChange={handleEditNameInputChange}
              handlePriceInputChange={handleEditPriceInputChange}
              handlePlataformaChange={handleEditPlataformaChange}
              handleTipoProductoChange={handleEditTipoProductoChange}
              handleCorreoAsociadoChange={handleEditCorreoAsociadoChange}
              handlePasswordAsociadoChange={handleEditPasswordAsociadoChange}
              handleImageChange={handleEditImageChange}
              plataformasStats={plataformasStats}
              tipoProductosStats={tipoProductosStats}
              errorMessage={errorMessage}
              onCloseEditForm={handleCloseEditForm}
              handleGuardarCambios={handleGuardarCambios}
            />
          )}
        </Grid>

        {!isFormVisible && !isEditFormVisible && (
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowForm}
            >
              Añadir Producto +
            </Button>
          </Grid>
        )}

        {!isFormVisible && !isEditFormVisible && (
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <Typography variant="h5" gutterBottom>
                Lista de Productos
              </Typography>
              <ProductosTabla
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            </Paper>
          </Grid>
        )}

        {/* {!isFormVisible && !isEditFormVisible && (
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowForm}
            >
              Añadir Categoria +
            </Button>
          </Grid>
        )}

        {!isFormVisible && !isEditFormVisible && (
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <Typography variant="h5" gutterBottom>
                Lista de Categorias
              </Typography>
              <CategoriasTabla
                categorias={categorias}
                onEdit={handleEditCategoria}
                onDelete={handleDeleteProduct}
              />
            </Paper>
          </Grid>
        )} */}

        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h5" gutterBottom>
              Estadísticas de Recargas
            </Typography>
            <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
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
            <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
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
  );
};

export default AdminDashboard;
