const express = require('express');
const conectarDB = require("./config/db");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');

// Crear la aplicación de Express
const app = express();
const port = process.env.PORT || 9000;

// Configuración de CORS para permitir peticiones desde el frontend
app.use(cors({
    origin: 'http://localhost:4200', // Cambia esto si tu frontend está en otro puerto o dominio
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Conexión a la base de datos MongoDB
conectarDB();

// Middleware para manejar JSON en las solicitudes
// app.use(express.json());
app.use(express.json({ limit: '120mb' }));
app.use(express.urlencoded({ limit: '120mb', extended: true }));

// Definir las rutas
app.use('/api/reservacion', require('./routes/reservacionRoutes'));
app.use('/api/comentarios', require('./routes/comentarios'));
app.use('/api/estatusHabitacion', require('./routes/estatusHabitacion'));
app.use('/api/home', require('./routes/homeRoutes'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/role', require('./routes/role'));
app.use('/api/bedrooms', require('./routes/roomRoutes')); 
app.use('/api/details', require('./routes/detailsRoutes')); 

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto: ${port}`);
});
