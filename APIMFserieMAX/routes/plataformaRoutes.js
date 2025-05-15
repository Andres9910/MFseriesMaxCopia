const express = require('express');
const router = express.Router();
const plataformaController = require('../controllers/plataformaController');

router.get('/plataformas', plataformaController.getAllPlataforma);

module.exports = router;