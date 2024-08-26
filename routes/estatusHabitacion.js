const express = require("express");
const estatusHabitacionController = require('../controllers/estatusHabitacionController')

const router = express.Router();

router.get('/', estatusHabitacionController.getHabitaciones)
router.put('/', estatusHabitacionController.updateEstatusHabitacion);

module.exports = router;