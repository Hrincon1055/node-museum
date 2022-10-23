const express = require('express');
const cors = require('cors');
const { sequelize } = require('./db/config');
// const { Usuarios } = require('./models/Usuario');
// const { Favoritos } = require('./models/Favorito');
require('dotenv').config();

async function main() {
  try {
    // Base de datos
    await sequelize.sync({ force: false });
    // Crear el servidor
    const app = express();
    // Directorio publico
    app.use(express.static('public'));
    // cors
    app.use(cors());
    // Lectura y parseo del body
    app.use(express.json());
    // Rutas
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/favorito', require('./routes/favorito'));
    app.use('/api/museum', require('./routes/museum'));

    app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
