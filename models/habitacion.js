const mongoose = require("mongoose");

const habitacionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    estatus: {
        type: String,
        required: false
    },
    criteriosARevisar: [{
        type: String,
        required: false
    }],
    comentarios: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('bedrooms', habitacionSchema);