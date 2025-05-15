const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Recarga = sequelize.define('Recarga', {
  id_recarga: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuario',
      key: 'id_usuario'
    }
  },
  monto_recargado: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  fecha_recarga: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'recarga',
  timestamps: false
});

module.exports = Recarga;