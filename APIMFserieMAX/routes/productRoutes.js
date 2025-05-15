// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');

// Configurar multer para manejar la carga de archivos
const storage = multer.memoryStorage();  // Usar almacenamiento en memoria para archivos
const upload = multer({ storage });

// Rutas de productos
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.put('/products/deactivateProduct/:id', productController.deactivateProduct);

module.exports = router;
