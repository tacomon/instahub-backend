//Rutas Reservacion
const express = require('express');
const router = express.Router();
const reservacionController = require('../controllers/reservacionController');

//api Reservacion
router.post('/', reservacionController.createReservacion);
router.get('/', reservacionController.getReservacion);
router.get('/:id', reservacionController.getReservacionId);
router.delete('/:id', reservacionController.deleteReservacionId);


module.exports = router;