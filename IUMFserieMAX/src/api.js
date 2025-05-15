import axios from 'axios';

//para local
// const API_URL = 'http://localhost:4000/api'; // Cambia esto a la URL de tu backend
// para despliegue en internet
const API_URL = 'https://apimfseriemax.onrender.com/api'; // Cambia esto a la URL de tu backend

// Funciones para Administrador
export const createAdmin = async (adminData) => {
  try {
    const response = await axios.post(`${API_URL}/admin/register`, adminData);
    return response.data;
  } catch (error) {
    console.error('Error al crear administrador:', error);
    throw error;
  }
};

export const loginAdmin = async (adminData) => {
  try {
    const response = await axios.post(`${API_URL}/admin/login`, adminData);
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión de administrador:', error);
    throw error;
  }
};

export const getAdminStatistics = async (adminId) => {
  try {
    const response = await axios.get(`${API_URL}/admin/statistics/${adminId}`);
    // const response = await axios.get(`${API_URL}/admin/statistics/`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener estadísticas de administrador:', error);
    throw error;
  }
};

// Funciones para Producto
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener producto:', error);
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData);
    return response.data;
  } catch (error) {
    console.error('Error al añadir producto:', error);
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(`${API_URL}/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

export const removeProduct = async (productId) => {
  try {
    const response = await axios.put(`${API_URL}/products/deactivateProduct/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error al quitar producto:', error);
    throw error;
  }
};

// Funciones para Recarga
export const recargarSaldo = async (recargaData) => {
  try {
    const response = await axios.post(`${API_URL}/recargas`, recargaData);
    return response.data;
  } catch (error) {
    console.error('Error al recargar saldo:', error);
    throw error;
  }
};

export const verHistorialRecargas = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/recargas/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener historial de recargas:', error);
    throw error;
  }
};

// Funciones para Compra
export const createCompra = async (compraData) => {
  try {
    const response = await axios.post(`${API_URL}/compras`, compraData);
    return response.data;
  } catch (error) {
    console.error('Error al crear compra:', error);
    throw error;
  }
};

export const getAllCompras = async () => {
  try {
    const response = await axios.get(`${API_URL}/compras`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener compras:', error);
    throw error;
  }
};

export const getCompraById = async (compraId) => {
  try {
    const response = await axios.get(`${API_URL}/compras/${compraId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener compra:', error);
    throw error;
  }
};

export const getComprasByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/compras/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener compras por usuario:', error);
    throw error;
  }
};

export const deleteCompra = async (compraId) => {
  try {
    const response = await axios.delete(`${API_URL}/compras/${compraId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar compra:', error);
    throw error;
  }
};

// Funciones para Usuario
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión de usuario:', error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    throw error;
  }
};

export const updateSaldo = async (userId, saldoData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}/saldo`, saldoData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar saldo:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
};

// Funciones para CantidadRecargas
export const createCantidadRecargas = async (cantidadRecargasData) => {
  try {
    const response = await axios.post(`${API_URL}/cantidadrs`, cantidadRecargasData);
    return response.data;
  } catch (error) {
    console.error('Error al crear cantidad de recargas:', error);
    throw error;
  }
};

export const getAllCantidadRecargas = async () => {
  try {
    const response = await axios.get(`${API_URL}/cantidadrs`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener cantidades de recargas:', error);
    throw error;
  }
};

export const getCantidadRecargaById = async (cantidadRecargaId) => {
  try {
    const response = await axios.get(`${API_URL}/cantidadrs/${cantidadRecargaId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener cantidad de recarga:', error);
    throw error;
  }
};

export const deleteCantidadRecarga = async (cantidadRecargaId) => {
  try {
    const response = await axios.delete(`${API_URL}/cantidadrs/${cantidadRecargaId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar cantidad de recarga:', error);
    throw error;
  }
};

export const getRecargasStatistics = async (period) => {
  try {
    const response = await axios.get(`${API_URL}/cantidadrs/statistics/${period}`);
    // console.log("estadistica de recargas por periodo: ", response)
    return response.data;
  } catch (error) {
    console.error('Error al obtener estadísticas de recargas:', error);
    throw error;
  }
};

// Funciones para CantidadProductos
export const createCantidadProductos = async (cantidadProductosData) => {
  try {
    const response = await axios.post(`${API_URL}/cantidadps`, cantidadProductosData);
    return response.data;
  } catch (error) {
    console.error('Error al crear cantidad de productos:', error);
    throw error;
  }
};

export const getAllCantidadProductos = async () => {
  try {
    const response = await axios.get(`${API_URL}/cantidadps`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener cantidades de productos:', error);
    throw error;
  }
};

export const getCantidadProductoById = async (cantidadProductoId) => {
  try {
    const response = await axios.get(`${API_URL}/cantidadps/${cantidadProductoId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener cantidad de producto:', error);
    throw error;
  }
};

export const deleteCantidadProducto = async (cantidadProductoId) => {
  try {
    const response = await axios.delete(`${API_URL}/cantidadps/${cantidadProductoId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar cantidad de producto:', error);
    throw error;
  }
};

export const getProductosStatistics = async (period) => {
  try {
    const response = await axios.get(`${API_URL}/cantidadps/statistics/${period}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener estadísticas de productos:', error);
    throw error;
  }
};

// Nueva función para obtener todos los administradores registrados
export const getAllAdmins = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/all`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener todos los administradores:', error);
    throw error;
  }
};

export const getAllTipoProducto = async () => {
  try {
    const response = await axios.get(`${API_URL}/tipoProducto`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener todos los tipos de productos:', error);
    throw error;
  }
};

export const getAllPlataformas = async () => {
  try {
    const response = await axios.get(`${API_URL}/plataformas`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener todos las plataformas:', error);
    throw error;
  }
};

export const getTipoProductoById = async (categoriaId) => {
  try {
    const response = await axios.get(`${API_URL}/tipoProducto/${categoriaId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la categoria:', error);
    throw error;
  }
};

export const removeCategoria = async (categoriaId) => {
  try {
    const response = await axios.put(`${API_URL}/tipoProducto/deactivateProduct/${categoriaId}`);
    return response.data;
  } catch (error) {
    console.error('Error al quitar categoria:', error);
    throw error;
  }
};