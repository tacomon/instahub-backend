const express = require('express');
const conectarDB = require("./config/db");
const cors = require("cors");

const authRoutes = require('./routes/auth');
const homeRoute = require('./routes/homeRoutes');

//Se crea el servidor
const app = express();
const port = process.env.PORT || 9000;

//Conexion a MongoDB
conectarDB();
app.use(
    cors({
        origin: `*`,
        credentials: true
    })
);
//Middelwares
app.use(express.json());


//Routes
app.use('/api/reservacion', require('./routes/reservacionRoutes'));
app.use('/api/home', homeRoute);
app.use('/api/auth', authRoutes);

//Escuchando en el puerto 9000
app.listen(port, () => {
    console.log("El servidor esta corriendo en el puerto: ", port);
});
