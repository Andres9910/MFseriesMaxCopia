const Compra = require('../models/Compra');
const Usuario = require('../models/Usuario');
const Producto = require('../models/Producto');

exports.createCompra = async (req, res) => {
    try {
        const { id_usuario, id_producto, cantidad } = req.body;

        // Verificar si el usuario existe
        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Buscar el producto
        const producto = await Producto.findByPk(id_producto);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        // Calcular el precio total
        const precio_total = producto.precio_producto * cantidad;

        // Crear la compra
        const nuevaCompra = await Compra.create({
            id_usuario,
            id_producto,
            cantidad,
            precio_total
        });

        res.status(201).json(nuevaCompra);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la compra.' });
    }
};

exports.getAllCompras = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const compras = await Compra.findAll({
            include: [
                { model: Usuario, attributes: ['nom_usuario'] },
                { model: Producto, attributes: ['nom_producto', 'precio_producto'] }
            ],
            limit,
            offset,
        });

        res.status(200).json(compras);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las compras.' });
    }
};

exports.getCompraById = async (req, res) => {
    try {
        const { id } = req.params;
        const compra = await Compra.findByPk(id, {
            include: [
                { model: Usuario, attributes: ['nom_usuario'] },
                { model: Producto, attributes: ['nom_producto'] }
            ]
        });

        if (!compra) {
            return res.status(404).json({ message: 'Compra no encontrada.' });
        }

        res.status(200).json(compra);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la compra.' });
    }
};

exports.deleteCompra = async (req, res) => {
    try {
        const { id } = req.params;
        const compra = await Compra.findByPk(id);

        if (!compra) {
            return res.status(404).json({ message: 'Compra no encontrada.' });
        }

        await compra.destroy();
        res.status(200).json({ message: 'Compra eliminada correctamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la compra.' });
    }
};