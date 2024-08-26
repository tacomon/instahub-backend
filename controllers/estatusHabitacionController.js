const express = require("express");
const Habitacion = require("../models/habitacion");

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
        res.send(response)
    } catch (error) {
        console.info(error)
        res.status(400).send({message: 'Error al intentar actualizar el estatus de la habitación', error})
    }
}