require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./config/database');

// Lista de orígenes permitidos
const allowedOrigins = [
  'http://localhost:3000', // Para desarrollo local
 // 'https://iumfseriemax.onrender.com', // El origen de tu frontend en Render
];

// Configurar CORS con opciones
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) { // Permitir orígenes en la lista o solicitudes sin origen (ej. desde el mismo servidor)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Permite enviar cookies si es necesario
};

app.use(cors(corsOptions));

// Middleware para parsear JSON con límite de tamaño aumentado
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const compraRoutes = require('./routes/compraRoutes');
const adminRoutes = require('./routes/adminRoutes');
const recargaRoutes = require('./routes/recargaRoutes');
const cantidadpRoutes = require('./routes/cantidadpRoutes');
const cantidadrRoutes = require('./routes/cantidadrRoutes');
const tipoProductoRoutes = require('./routes/tipoProductoRoutes');
const plataformas = require('./routes/plataformaRoutes');

// Usar las rutas
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', compraRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', recargaRoutes);
app.use('/api', cantidadpRoutes);
app.use('/api', cantidadrRoutes);
app.use('/api', tipoProductoRoutes);
app.use('/api', plataformas);

// Sincronizar la base de datos y luego iniciar el servidor
sequelize.sync()
  .then(() => {
    console.log('Conexión a la base de datos establecida.');
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });