const express = require("express");
const comentariosController = require('../controllers/comentariosController')

const router = express.Router();

router.get('/:idBedroom', comentariosController.getComentariosByIdBedroom)

router.post('', comentariosController.nuevoComentario);

router.delete('/:idComentario', comentariosController.borrarComentario);

router.put('/reportar/:idComentario', comentariosController.reportarComentarioById);


router.get('/estadisticas/:idBedroom', comentariosController.getEstadisticasBedroom);

module.exports = router;