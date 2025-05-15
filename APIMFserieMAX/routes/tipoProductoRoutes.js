const express = require('express');
const router = express.Router();
const tipoProductoController = require('../controllers/tipoProductoController');

router.get('/tipoProducto', tipoProductoController.getAllTipoProducto);
router.get('/tipoProducto/:id', tipoProductoController.getTipoProductoById);
router.post('/tipoProducto', tipoProductoController.createTipoProduct);
router.put('/tipoProducto/:id', tipoProductoController.updateTipoProduct);
router.put('/tipoProducto/deactivateTipoProduct/:id', tipoProductoController.deactivateTipoProduct);

module.exports = router;