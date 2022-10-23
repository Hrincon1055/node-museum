const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/config');
const Favoritos = sequelize.define(
  'favoritos',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    favoritoKey: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    principalOrFirstMaker: {
      type: DataTypes.STRING,
    },
    urlImg: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);
module.exports = { Favoritos };
