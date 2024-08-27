const express = require("express");
const userSchema = require("../models/users.js");

const router = express.Router();

//Crear usuario
router.post('/users', (req, res) => {
    res.send("Create user Works!");
});

module.exports = router;