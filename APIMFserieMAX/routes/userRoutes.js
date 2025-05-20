// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users/:id', userController.getUserById);
router.get('/users', userController.getAllUsers);
router.put('/users/:id/saldo', userController.updateSaldo);
router.put('/users/updateUserByDesactivate/:id', userController.updateUserByDesactivate);
router.delete('/users/:id', userController.deleteUser);
router.put('/users/deleteUserByEstado/:id', userController.deleteUserByEstado);

module.exports = router;
