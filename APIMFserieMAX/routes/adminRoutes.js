const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Otras rutas de administrador
router.post('/create', adminController.createAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/statistics/:idAdmin', adminController.getStatistics);
router.get('/all', adminController.getAllAdmins);

module.exports = router;