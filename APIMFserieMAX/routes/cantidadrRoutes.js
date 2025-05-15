const express = require('express');
const router = express.Router();
const cantidadrController = require('../controllers/cantidadrController'); // Asegúrate de que la ruta sea correcta

// Definir las rutas y sus controladores
router.post('/cantidadrs', cantidadrController.createCantidadRecargas); // POST para crear
router.get('/cantidadrs', cantidadrController.getAllCantidadRecargas); // GET para obtener todas
router.get('/cantidadrs/:id', cantidadrController.getCantidadRecargaById); // GET para obtener por ID
router.delete('/cantidadrs/:id', cantidadrController.deleteCantidadRecarga); // DELETE para eliminar por ID
router.get('/cantidadrs/statistics/:period', cantidadrController.getRecargasStatistics); // GET para estadísticas

module.exports = router;