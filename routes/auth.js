const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/validar-token', authController.validarToken);
router.post('/registro', authController.registro);

module.exports = router;