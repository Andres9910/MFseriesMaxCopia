const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
    const Plataformas = sequelize.define('Plataformas', {
      id_plataforma: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nom_plataforma: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    }, {
      tableName: 'plataformas',
      timestamps: false
    });
  
    module.exports = Plataformas;
  