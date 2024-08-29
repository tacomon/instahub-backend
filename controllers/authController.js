
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { enviarCorreoRegistro, enviarCorreoInicioSesion } = require('../utils/email');
const crypto = require('crypto');

exports.registro = async (req, res) => {
    try {
        const { nombre, correo, telefono, contrasena, rol } = req.body;
        let usuario = await User.findOne({ correo });
        if (usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        usuario = new User({ nombre, correo, telefono, contrasena, rol });
        await usuario.save();

        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated Token:', token);
        await enviarCorreoRegistro(correo, token);

        res.status(201).json({ msg: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};


exports.login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        const usuario = await User.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({ success: false, msg: 'Credenciales inválidas' });
        }
        if(!usuario.estatus) {
            return res.status(400).json({ success: false, msg: 'El usuario ha sido bloqueado, contacte al administrador' });
        }

        // Comparar la contraseña en texto plano proporcionada con la contraseña encriptada almacenada
        const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
        
        // Verificar si la contraseña almacenada es igual a la contraseña en texto plano (solo para pruebas)
        const isPlainMatch = contrasena === usuario.contrasena;

        if (!isMatch && !isPlainMatch) {
            return res.status(400).json({ success: false, msg: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated Token:', token);
        usuario.loginToken = token;
        await usuario.save();

        // Enviar el token por correo electrónico
        await enviarCorreoInicioSesion(correo, token);

        // Responder al cliente
        res.json({ success: true, msg: 'Token enviado al correo electrónico', rol: usuario.rol, nombre: usuario.nombre });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Error en el servidor' });
    }
};

exports.validarToken = async (req, res) => {
    try {
        const { token } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await User.findOne({ _id: decoded.id, loginToken: token });

        if (!usuario) {
            return res.status(401).json({ isValid: false, rol: null });
        }

        res.json({ isValid: true, rol: usuario.rol });
    } catch (error) {
        console.error(error);
        res.status(401).json({ isValid: false, rol: null });
    }
};