const express = require("express");
const roleController = require('../controllers/roleController')

const router = express.Router();

router.get('/usuarios', roleController.getUsuarios)
router.put('/usuarios/:idUsuario', roleController.actualizaEstatusUsuario)

module.exports = router;