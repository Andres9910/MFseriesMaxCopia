const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define('Producto', {
  id_producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nom_producto: {
    type: DataTypes.STRING,
    allowNull: true
  },
  precio_producto: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  id_plataforma: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  id_tipo_producto: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  correo_asociado: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password_asociado: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  tableName: 'producto',
  timestamps: false
});

module.exports = Producto;