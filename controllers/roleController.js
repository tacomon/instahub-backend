const Usuario = require("../models/users");

exports.getUsuarios = async (req, res) => {
    try {
        res.send(await Usuario.find())
    } catch(error) {
        console.info(error)
        res.status(400).send({message: 'Error obtener los usuarios', error})
    }
}

exports.actualizaEstatusUsuario = async (req, res) => {
    const _id = req.params.idUsuario
    const estatus = req.body.estatus;
    try {
        const usuarioUpdate = await Usuario.findOneAndUpdate({_id}, {estatus})
        res.send({message: 'Usuario actualizado correctamente'})
    } catch(error) {
        console.info(error)
        res.status(400).send({message: 'Error obtener los usuarios', error})
    }
}
