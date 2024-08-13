const Reservacion = require("../models/reservacionSchema");

exports.createReservacion = async (req, res) => {
    try {
        let reservacion;
        console.info('reservacion: ', req.body)
        reservacion = new Reservacion(req.body);
        await reservacion.save();
        res.send(reservacion);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error')
    }
}

exports.getReservacion = async (req, res) => {
    console.info('getReservacion')
    try {
        const reservacion = await Reservacion.find();
        res.status(200).json(reservacion);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getReservacionId = async (req, res) => {
    console.info('getReservacionId')
    console.info(req.params)
    try {
        let reservacion = await Reservacion.findById(req.params.id);
        if (!reservacion) {
            res.status(404).json({ msg: 'Esta Reservación no existe!' })
        }
        res.json(reservacion);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.deleteReservacionId = async (req, res) => {
    console.info('deleteReservacionById::', req.params.id)
    const reservacion = await Reservacion.findByIdAndDelete(req.params.id);
    if (!reservacion) {
        res.status(404).json({ msg: 'No existe esta reservación' })
    } else {
        res.json(reservacion);
    }
}
