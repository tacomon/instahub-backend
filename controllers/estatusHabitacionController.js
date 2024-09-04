const express = require("express");
const Habitacion = require("../models/habitacion");
const Usuario =  require("./../models/users")
const { enviarCorreoEstatusHabitacion } = require('../utils/email');

exports.getHabitaciones = async (req, res) => {
    const idBedroom = req.params.idBedroom;
    try {
        const getHabitaciones = await Habitacion.find({ estatus: { $in: [null, 'Rechazado'] }})
        res.send(getHabitaciones)
    } catch(error) {
        console.info(error)
        res.status(400).send({message: 'Error obtener las habitaciones por revisar', error})
    }
}

exports.updateEstatusHabitacion =  async (req, res) => {
    const habitacion = req.body;
    console.info(habitacion)
    try {
        const response = await Habitacion.findOneAndUpdate({_id: habitacion._id}, habitacion);
        const correoAnfitrion = await Usuario.findById(response.host);

        const data = {
            nombre: correoAnfitrion.nombre,
            estatus: habitacion.estatus,
            correo: correoAnfitrion.correo,
            nombreHabitacion: response.title,
            comentarios: habitacion.comentarios
        }
        await enviarCorreoEstatusHabitacion(data)

        res.send(response)
    } catch (error) {
        console.info(error)
        res.status(400).send({message: 'Error al intentar actualizar el estatus de la habitación', error})
    }
}