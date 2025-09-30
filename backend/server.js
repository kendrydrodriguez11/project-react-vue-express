const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const servidor = express();
const PUERTO = 3000;

// Middlewares
servidor.use(cors());
servidor.use(bodyParser.json());

// Rutas
const personasRoutes = require('./routes/people');
servidor.use('/api/new', personasRoutes);

servidor.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
