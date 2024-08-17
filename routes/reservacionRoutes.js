//Rutas Reservacion
const express = require('express');
const reservacionController = require('../controllers/reservacionController');

const router = express.Router();

//api Reservacion
router.post('/', reservacionController.createReservacion);
router.get('/', reservacionController.getReservacion);
router.get('/:id', reservacionController.getReservacionId);
router.delete('/:id', reservacionController.deleteReservacionId);


module.exports = router;