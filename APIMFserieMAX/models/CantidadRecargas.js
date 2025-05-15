const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

 const CantidadRecargas = sequelize.define('CantidadRecargas', {
    id_cantidad_recarga: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    id_recarga: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Recarga',
        key: 'id_recarga'
      }
    },
    fecha_c: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    cantidad_recargada: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    periodo_r: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    total_acumulado: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    }, {
      tableName: 'cantidad_recargas',
      timestamps: false
    });
  
module.exports = CantidadRecargas;
  