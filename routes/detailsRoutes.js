// module.exports = router;
const express = require('express');
const router = express.Router();
const detailsController = require('../controllers/detailsController');

// Asegúrate de que el endpoint está configurado correctamente
router.get('/:id', detailsController.getBedroomDetails);

module.exports = router;

