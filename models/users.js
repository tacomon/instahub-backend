const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: String,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['administrador', 'anfitrion', 'usuario'],
        default: 'usuario'
    },
    tokenVerificacion: String,
    tokenExpiracion: Date,
    loginToken: String,
    fecha_registro: {
        type: Date,
        default: Date.now
    },
    estatus: {
        type: Boolean,
        required: false,
        default: true
    }
});

userSchema.pre('save', async function(next) {
    if (this.isModified('contrasena')) {
        this.contrasena = await bcrypt.hash(this.contrasena, 8);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);