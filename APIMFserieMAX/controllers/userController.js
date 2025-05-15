const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { nom_usuario, pass_usuario } = req.body;

    try {
        // Validar campos
        if (!nom_usuario || !pass_usuario) {
            return res.status(400).json({ error: 'El nombre de usuario y la contraseña son obligatorios.' });
        }

        // Verificar si el usuario ya existe
        const userExists = await Usuario.findOne({ where: { nom_usuario } });
        if (userExists) {
            return res.status(400).json({ error: 'El nombre de usuario ya está en uso.' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(pass_usuario, 10);

        // Crear el usuario
        const newUser = await Usuario.create({
            nom_usuario,
            pass_usuario: hashedPassword,
        });

        res.status(201).json({ message: 'Usuario registrado exitosamente.', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario.' });
    }
};

exports.loginUser = async (req, res) => {
    const { nom_usuario, pass_usuario } = req.body;

    try {
        // Validar campos
        if (!nom_usuario || !pass_usuario) {
            return res.status(400).json({ error: 'El nombre de usuario y la contraseña son obligatorios.' });
        }

        // Verificar si el usuario existe
        const user = await Usuario.findOne({ where: { nom_usuario } });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        // Comparar la contraseña
        const validPassword = await bcrypt.compare(pass_usuario, user.pass_usuario);
        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id_usuario: user.id_usuario, nom_usuario: user.nom_usuario },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Inicio de sesión exitoso.', token: token, userId: user.id_usuario, rol: user.rol });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.params.id, {
            attributes: { exclude: ['pass_usuario'] }
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario.' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const users = await Usuario.findAll({
            attributes: { exclude: ['pass_usuario'] },
            limit,
            offset,
        });

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios.' });
    }
};

exports.updateSaldo = async (req, res) => {
    const { saldo_asociado } = req.body;

    try {
        // Validar el saldo
        if (isNaN(saldo_asociado) || saldo_asociado < 0) {
            return res.status(400).json({ error: 'El saldo debe ser un número positivo.' });
        }

        const user = await Usuario.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        user.saldo_asociado = saldo_asociado;
        await user.save();

        res.json({ message: 'Saldo actualizado correctamente.', user });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el saldo.' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        await user.destroy();
        res.json({ message: 'Usuario eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario.' });
    }
};