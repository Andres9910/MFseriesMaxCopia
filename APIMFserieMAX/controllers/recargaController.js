const Recarga = require('../models/Recarga');
const Usuario = require('../models/Usuario');

exports.recargarSaldo = async (req, res) => {
    const { id_usuario, monto_recargado } = req.body;

    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Validar el monto
        if (monto_recargado <= 0) {
            return res.status(400).json({ message: 'El monto debe ser mayor que cero.' });
        }

        // Crear la recarga
        const nuevaRecarga = await Recarga.create({
            id_usuario,
            monto_recargado
        });

        // Actualizar el saldo del usuario
        usuario.saldo_asociado += parseFloat(monto_recargado);
        await usuario.save();

        return res.status(201).json({ message: 'Saldo recargado exitosamente.', recarga: nuevaRecarga });
    } catch (error) {
        return res.status(500).json({ message: 'Error al recargar saldo.', error });
    }
};

exports.verHistorialRecargas = async (req, res) => {
    const { id_usuario } = req.params;

    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Obtener el historial de recargas
        const historialRecargas = await Recarga.findAll({
            where: { id_usuario },
            order: [['fecha_recarga', 'DESC']]
        });

        return res.status(200).json(historialRecargas);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el historial de recargas.', error });
    }
};