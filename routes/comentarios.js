const express = require("express");
const Comentarios = require("../models/comentarios");

const router = express.Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.info(req.params.id)
    try {
        const getComentarios = await Comentarios.find({ idBedrooms: id, isReported: { $in: [false, null] }})
        res.send(getComentarios)
    } catch(error) {
        console.info(error)
        res.status(400).send({message: 'Error obtener los comentarios', error})
    }
})

router.post('', async (req, res) => {
    const comentario = req.body;
    console.info(comentario)
    try {
        const newComentario = new Comentarios(comentario);
        const response = await newComentario.save();
        res.send(response)
    } catch (error) {
        console.info(error)
        res.status(400).send({message: 'Error al intentar guardar el comentario', error})
    }
});

router.delete('/:id', async (req, res) => {
    const comentarioId = req.params.id;
    console.info('Eliminar comentario _id: ', comentarioId)
    try {
        const comentarioDelete = await Comentarios.findByIdAndDelete(comentarioId);
        res.send(comentarioDelete)
    } catch (error) {
        console.info(error)
        res.status(400).send({message: 'Error al intentar borrar el comentario', error})
    }
});

router.put('/reportar/:id', async (req, res) => {
    const comentarioId = req.params.id;
    console.info('Reportar comentario _id: ', comentarioId)
    try {
        const updateComentario = await Comentarios.findByIdAndUpdate(comentarioId, {isReported: true});
        res.send({message: `El comentario ha sido reportado`})
    } catch (error) {
        console.info(error)
        res.status(400).send({message: 'Error al intentar guardar el comentario', error})
    }
});


router.get('/estadisticas/:id', async (req, res) => {
    const id = req.params.id;
    console.info(id)
    try {
        const getCalificaciones = await Comentarios.find({ idBedrooms: id, isReported: { $in: [false, null] } }, 'calificacion').exec();
        const estadisticas = {
            estrella1: {cantidad: 0, porcentaje: null},
            estrella2: {cantidad: 0, porcentaje: null},
            estrella3: {cantidad: 0, porcentaje: null},
            estrella4: {cantidad: 0, porcentaje: null},
            estrella5: {cantidad: 0, porcentaje: null},
        }
        let contador = 0;
        getCalificaciones.forEach(element => {
            contador++;
            switch(element.calificacion) {
                case "1":
                    estadisticas.estrella1.cantidad++
                    break;
                case "2":
                    estadisticas.estrella2.cantidad++
                    break;
                case "3":
                    estadisticas.estrella3.cantidad++
                    break;
                case "4":
                    estadisticas.estrella4.cantidad++
                    break;
                case "5":
                    estadisticas.estrella5.cantidad++
                    break;
                default:
                    break;
            }
        });
        estadisticas.estrella1.porcentaje = estadisticas.estrella1.cantidad * 100 / contador;
        estadisticas.estrella2.porcentaje = estadisticas.estrella2.cantidad * 100 / contador;
        estadisticas.estrella3.porcentaje = estadisticas.estrella3.cantidad * 100 / contador;
        estadisticas.estrella4.porcentaje = estadisticas.estrella4.cantidad * 100 / contador;
        estadisticas.estrella5.porcentaje = estadisticas.estrella5.cantidad * 100 / contador;
        res.send(estadisticas);
    } catch (error) {
        console.info(error)
        res.status(400).send({message: 'Error al intentar guardar el comentario', error})
    }
});

module.exports = router;