const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/config');
const { Favoritos } = require('./Favorito');
const bcrypt = require('bcryptjs');
const Usuarios = sequelize.define(
  'usuarios',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: DataTypes.STRING,
    },
    email: { type: DataTypes.STRING, unique: true },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hash);
      },
    },
  },
  { timestamps: true }
);

Usuarios.hasMany(Favoritos, { foreignKey: 'usuarioId', sourceKey: 'id' });
Favoritos.belongsTo(Usuarios, { foreignKey: 'usuarioId', targetKey: 'id' });
module.exports = { Usuarios };
