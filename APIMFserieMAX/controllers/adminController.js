const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Administrador = require('../models/Administrador');
const Producto = require('../models/Producto');
const Recarga = require('../models/Recarga');
const Compra = require('../models/Compra');

exports.createAdmin = async (req, res) => {
    const { nom_admin, email_admin, pass_admin } = req.body;

    try {
        // Verificar si el correo electrónico ya existe
        const existingAdmin = await Administrador.findOne({ where: { email_admin } });
        if (existingAdmin) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(pass_admin, 10);

        // Crear un nuevo administrador
        const newAdmin = await Administrador.create({
            nom_admin,
            email_admin,
            pass_admin: hashedPassword
        });

        return res.status(201).json({ message: 'Administrador registrado exitosamente.', admin: newAdmin });
    } catch (error) {
        return res.status(500).json({ message: 'Error al registrar el administrador.', error });
    }
};

exports.loginAdmin = async (req, res) => {
    const { email_admin, pass_admin } = req.body;
  
    //console.log('Contraseña recibida:', pass_admin); // Depuración
  
    try {
      const admin = await Administrador.findOne({ where: { email_admin } });
      if (!admin) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
      }
  
      //console.log('Contraseña en la base de datos:', admin.pass_admin); // Depuración
  
      const isMatch = await bcrypt.compare(pass_admin, admin.pass_admin);
      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
      }
  
      const token = jwt.sign({ id: admin.id_admin }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ token: token, rol: admin.rol, idAdmin: admin.id_admin });
    } catch (error) {
      console.error('Error al iniciar sesión de administrador:', error);
      return res.status(500).json({ message: 'Error al iniciar sesión de administrador' });
    }
  };

exports.getStatistics = async (req, res) => {
    try {
        const totalCompras = (await Compra.sum('precio_total')) || 0;
        const totalRecargas = (await Recarga.sum('monto_recargado')) || 0;
        // const totalCompras = (await Compra.count()) || 0;

        // return res.status(200).json({
        //     totalProductosVendidos,
        //     totalRecargas,
        //     totalCompras
        // });

        return res.status(200).json({
            totalCompras,
            totalRecargas
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener estadísticas.', error });
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Administrador.findAll();
        return res.status(200).json(admins); // Devuelve directamente el array
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los administradores.', error });
    }
};