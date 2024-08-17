const express = require("express");
const Comentarios = require("../models/comentarios");

exports.getComentariosByIdBedroom = async (req, res) => {
    const idBedroom = req.params.idBedroom;
    console.info('Obteniendo comentarios de la habitación: ', idBedroom)
    try {
        const getComentarios = await Comentarios.find({ idBedrooms: idBedroom, isReported: { $in: [false, null] }})
        res.send(getComentarios)
    } catch(error) {
        console.info(error)
        res.status(400).send({message: 'Error obtener los comentarios', error})
    }
}

exports.nuevoComentario =  async (req, res) => {
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
}

exports.borrarComentario = async (req, res) => {
    const comentarioId = req.params.idComentario;
    console.info('Eliminar comentario _id: ', comentarioId)
    try {
        const comentarioDelete = await Comentarios.findByIdAndDelete(comentarioId);
        res.send(comentarioDelete)
    } catch (error) {
        console.info(error)
        res.status(400).send({message: 'Error al intentar borrar el comentario', error})
    }
}

exports.reportarComentarioById = async (req, res) => {
    const comentarioId = req.params.idComentario;
    console.info('Reportar comentario _id: ', comentarioId)
    try {
        const updateComentario = await Comentarios.findByIdAndUpdate(comentarioId, {isReported: true});
        res.send({message: `El comentario ha sido reportado`})
    } catch (error) {
        console.info(error)
        res.status(400).send({message: 'Error al intentar guardar el comentario', error})
    }
}


exports.getEstadisticasBedroom = async (req, res) => {
    const id = req.params.idBedroom;
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
}