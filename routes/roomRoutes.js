const express = require('express');
const router = express.Router();
const {
  createBedroom,
  getAllBedroomsByHost,
  deleteBedroom
} = require('../controllers/roomController');

// Ruta para crear una nueva habitación
router.post('/', createBedroom);

// Ruta para obtener todas las habitaciones de un anfitrión
router.get('/host/:host', getAllBedroomsByHost);

// Ruta para eliminar una habitación por ID
router.delete('/:id', deleteBedroom);

module.exports = router;


