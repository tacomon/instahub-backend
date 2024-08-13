const mongoose = require("mongoose");

const ReservacionSchema = mongoose.Schema({
    fecha_ingreso: {
        type: Date
    },
    fecha_termino: {
        type: Date
    },
    hora_llegada: {
        type: String
    },
    hora_salida: {
        type: String
    },
    huespedes: {
        type: Number
    }
});

module.exports = mongoose.model('Reservacion', ReservacionSchema);