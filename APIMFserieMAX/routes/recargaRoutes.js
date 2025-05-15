const express = require('express');
const router = express.Router();
const recargaController = require('../controllers/recargaController');

router.post('/recargas', recargaController.recargarSaldo);
router.get('/recargas/:id', recargaController.verHistorialRecargas);
// router.get('/recargas/statistics/:period', recargaController.getRecargasStatistics);

module.exports = router;