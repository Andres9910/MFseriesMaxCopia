const express = require('express');
const router = express.Router();
const cantidadpController = require('../controllers/cantidadpController');

// Definir las rutas y sus controladores
router.post('/cantidadps', cantidadpController.createCantidadProductos); // POST para crear
router.get('/cantidadps', cantidadpController.getAllCantidadProductos); // GET para obtener todas
router.get('/cantidadps/:id', cantidadpController.getCantidadProductoById); // GET para obtener por ID
router.delete('/cantidadps/:id', cantidadpController.deleteCantidadProducto); // DELETE para eliminar por ID
router.get('/cantidadps/statistics/:period', cantidadpController.getProductosStatistics); // GET para estadísticas

module.exports = router;