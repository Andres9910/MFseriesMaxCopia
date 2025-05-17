const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
    const TipoProducto = sequelize.define('TipoProducto', {
      id_tipo_producto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      desc_producto: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      tableName: 'tipo_producto',
      timestamps: false
    });
  
    module.exports = TipoProducto;
