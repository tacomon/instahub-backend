const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController'); // Asegúrate de la ruta correcta

// Ruta para obtener todas las categorías
router.get('/room-crud', categoryController.getCategories);

module.exports = router;
