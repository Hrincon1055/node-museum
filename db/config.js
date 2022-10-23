const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(
  process.env.DATABASE_POSGRET,
  process.env.USERNAME_POSGRET,
  process.env.PASSWORD_POSGRET,
  {
    host: process.env.HOST_POSGRET,
    dialect: 'postgres',
    port: process.env.PORT_POSGRET,
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false, // This line will fix new error
      },
    },
  }
);
module.exports = {
  sequelize,
};
