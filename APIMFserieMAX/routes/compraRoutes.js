// backend/routes/compraRoutes.js
const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

router.post('/compras', compraController.createCompra);
router.get('/compras', compraController.getAllCompras);
router.get('/compras/:id', compraController.getCompraById);
router.delete('/compras/:id', compraController.deleteCompra);

module.exports = router;
