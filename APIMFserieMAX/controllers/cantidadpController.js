const { CantidadProductos } = require('../models/CantidadProductos');
const Compra = require('../models/Compra');
const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');

exports.createCantidadProductos = async (req, res) => {
    try {
        const { id_producto, cantidad_vendida, periodo_p } = req.body;

        // Buscar el producto
        const producto = await Producto.findByPk(id_producto);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Calcular el total acumulado
        const ultimoRegistro = await CantidadProductos.findOne({
            where: { id_producto },
            order: [['createdAt', 'DESC']],
        });
        const total_acumulado = (ultimoRegistro?.total_acumulado || 0) + cantidad_vendida;

        // Crear el registro
        const nuevaCantidadProducto = await CantidadProductos.create({
            id_producto,
            cantidad_vendida,
            periodo_p,
            total_acumulado
        });

        res.status(201).json(nuevaCantidadProducto);
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la cantidad de productos: ' + erorr });
    }
};

exports.getAllCantidadProductos = async (req, res) => {
    try {
        const cantidadesProductos = await CantidadProductos.findAll({
            include: [{ model: Producto, attributes: ['nom_producto'] }]
        });
        res.status(200).json(cantidadesProductos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las cantidades de productos: ' + erorr });
    }
};

exports.getCantidadProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const cantidadProducto = await CantidadProductos.findByPk(id, {
            include: [{ model: Producto, attributes: ['nom_producto'] }]
        });

        if (!cantidadProducto) {
            return res.status(404).json({ message: 'Cantidad de producto no encontrada' });
        }

        res.status(200).json(cantidadProducto);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la cantidad de producto: ' + erorr });
    }
};

exports.deleteCantidadProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const cantidadProducto = await CantidadProductos.findByPk(id);

        if (!cantidadProducto) {
            return res.status(404).json({ message: 'Cantidad de producto no encontrada' });
        }

        await cantidadProducto.destroy();
        res.status(200).json({ message: 'Cantidad de producto eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la cantidad de producto: ' + erorr });
    }
};

exports.getProductosStatistics = async (req, res) => {
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

        const totalProductosVendidos = await Compra.count({
            where: Sequelize.where(
                Sequelize.fn('DATE', Sequelize.col('fecha_compra')),
                {
                    [Op.between]: [formatDate(dateFrom), formatDate(today)]
                }
            )
        });

        const sumaMontoProductosVendidos = await Compra.sum('precio_total', {
            where: Sequelize.where(
                Sequelize.fn('DATE', Sequelize.col('fecha_compra')),
                {
                    [Op.between]: [formatDate(dateFrom), formatDate(today)]
                }
            )
        });

        res.status(200).json({
            totalProductosVendidos,
            sumaMontoProductosVendidos: sumaMontoProductosVendidos || 0
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener estadísticas de productos vendidos: ' + error.message
        });
    }
};