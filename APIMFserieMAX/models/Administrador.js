const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
    const Administrador = sequelize.define('Administrador', {
      id_admin: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nom_admin: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      email_admin: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      pass_admin: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      rol: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'administrador',
      timestamps: false
    });
  
    module.exports = Administrador;
  