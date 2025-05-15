const { CantidadRecargas } = require('../models/CantidadRecargas');
const Recarga = require('../models/Recarga');
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');

exports.createCantidadRecargas = async (req, res) => {
    try {
        const { id_recarga, cantidad_recargada, periodo_r } = req.body;

        // Buscar la recarga
        const recarga = await Recarga.findByPk(id_recarga);
        if (!recarga) {
            return res.status(404).json({ message: 'Recarga no encontrada' });
        }

        // Calcular el total acumulado
        const ultimoRegistro = await CantidadRecargas.findOne({
            where: { id_recarga },
            order: [['createdAt', 'DESC']],
        });
        const total_acumulado = (ultimoRegistro?.total_acumulado || 0) + cantidad_recargada;

        // Crear el registro
        const nuevaCantidadRecarga = await CantidadRecargas.create({
            id_recarga,
            cantidad_recargada,
            periodo_r,
            total_acumulado
        });

        res.status(201).json(nuevaCantidadRecarga);
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la cantidad de recargas' });
    }
};

exports.getAllCantidadRecargas = async (req, res) => {
    try {
        const cantidadesRecargas = await CantidadRecargas.findAll({
            include: [{ model: Recarga, attributes: ['monto_recargado'] }]
        });
        res.status(200).json(cantidadesRecargas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las cantidades de recargas' });
    }
};

exports.getCantidadRecargaById = async (req, res) => {
    try {
        const { id } = req.params;
        const cantidadRecarga = await CantidadRecargas.findByPk(id, {
            include: [{ model: Recarga, attributes: ['monto_recargado'] }]
        });

        if (!cantidadRecarga) {
            return res.status(404).json({ message: 'Cantidad de recarga no encontrada' });
        }

        res.status(200).json(cantidadRecarga);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la cantidad de recarga' });
    }
};

exports.deleteCantidadRecarga = async (req, res) => {
    try {
        const { id } = req.params;
        const cantidadRecarga = await CantidadRecargas.findByPk(id);

        if (!cantidadRecarga) {
            return res.status(404).json({ message: 'Cantidad de recarga no encontrada' });
        }

        await cantidadRecarga.destroy();
        res.status(200).json({ message: 'Cantidad de recarga eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la cantidad de recarga' });
    }
};

exports.getRecargasStatistics = async (req, res) => {
    try {
        const { period } = req.params;

        const today = new Date();
        today.setHours(0, 0, 0, 0); // inicio del día local

        let dateFrom;
        switch (period) {
            case 'daily':
                dateFrom = new Date(today);
                break;
            case 'weekly':
                dateFrom = new Date(today);
                dateFrom.setDate(today.getDate() - 7);
                break;
            case 'monthly':
                dateFrom = new Date(today);
                dateFrom.setDate(today.getDate() - 30);
                break;
            default:
                return res.status(400).json({ message: 'Periodo no válido' });
        }

        // Convertir a 'YYYY-MM-DD' para comparar como fecha
        const formatDate = (date) => date.toISOString().split('T')[0];

        const totalRecargas = await Recarga.count({
            where: Sequelize.where(
                Sequelize.fn('DATE', Sequelize.col('fecha_recarga')),
                {
                    [Op.between]: [formatDate(dateFrom), formatDate(today)]
                }
            )
        });

        const sumaMontoRecargado = await Recarga.sum('monto_recargado', {
            where: Sequelize.where(
                Sequelize.fn('DATE', Sequelize.col('fecha_recarga')),
                {
                    [Op.between]: [formatDate(dateFrom), formatDate(today)]
                }
            )
        });

        res.status(200).json({
            totalRecargas,
            sumaMontoRecargado: sumaMontoRecargado || 0
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener estadísticas de recargas: ' + error.message
        });
    }
};


