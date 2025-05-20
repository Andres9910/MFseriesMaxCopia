const { Sequelize } = require('sequelize');
require('dotenv').config();
//en local
const sequelize = new Sequelize('MFserieMAX', 'postgres', '9910andres', {
host: 'localhost',
dialect: 'postgres'
});

// para desplegar en render
//const sequelize = new Sequelize(process.env.DATABASE_URL, {
  //dialect: 'postgres',
 // protocol: 'postgres',
  //logging: false, // opcional: evita logs de SQL
 // dialectOptions: {
   // ssl: {
   //   require: true,
    //  rejectUnauthorized: false // necesario para Render
  //  }
 // }
//});

module.exports = sequelize;
