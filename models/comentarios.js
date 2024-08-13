const mongoose = require("mongoose");

const comentariosSchema = mongoose.Schema({
    calificacion: {
        type: String,
        required: true
    },
    comentario: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    idBedrooms: {
        type: String,
        required: true
    },
    isReported: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('comentarios', comentariosSchema);