const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
    const CantidadProductos = sequelize.define('CantidadProductos', {
      id_cantidad_producto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      id_producto: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Producto',
          key: 'id_producto'
        }
      },
      fecha_p: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      cantidad_vendida: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      periodo_p: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      total_acumulado: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'cantidad_productos',
      timestamps: false
    });
  
    module .exports = CantidadProductos;
  