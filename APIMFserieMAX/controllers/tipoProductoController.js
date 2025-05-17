const TipoProduct = require('../models/TipoProducto');
const { Sequelize } = require('sequelize');

exports.getAllTipoProducto = async (req, res) => {
  try {
    const { Op } = require("sequelize");
    const tipoProducts = await TipoProduct.findAll({
      where:{
        estado: {
          [Op.in]: [1, 3]
        }
      }
    });
    res.json(tipoProducts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tipos de producto: ', error });
  }
};

exports.getTipoProductoById = async (req, res) => {
    try {
        const tipoProduct = await TipoProduct.findByPk(req.params.id);
        if (!tipoProduct) {
            return res.status(404).json({ error: 'Tipo Producto no encontrado: ' , error});
        }

        res.json(tipoProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el tipo producto: ', error });
    }
};

exports.createTipoProduct = async (req, res) => {
    try {
        const { desc_producto, estado } = req.body;

        // Normalizar nombre para evitar errores por espacios o mayúsculas
        const nombreNormalizado = desc_producto.trim().toLowerCase();

        // Validar si ya existe un registro con ese nombre
        const existente = await TipoProduct.findOne({
            where: Sequelize.where(
                Sequelize.fn('lower', Sequelize.col('desc_producto')),
                nombreNormalizado
            )
        });

        if (existente) {
            return res.status(409).json({ error: 'La categoría ya existe' });
        }

        const newTipoProduct = await TipoProduct.create({
            desc_producto: nombreNormalizado,
            estado
        });

        res.status(201).json(newTipoProduct);
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Ya existe una categoría con ese nombre' });
        }

        res.status(500).json({ error: 'Error al crear la categoría', detalle: error.message });
    }
};

exports.updateTipoProduct = async (req, res) => {
  try {
    const tipoProduct = await TipoProduct.findByPk(req.params.id);
    const idProduct = tipoProduct.id_tipo_producto;

    const {
      desc_producto,
      estado
    } = req.body;

    await tipoProduct.update({
      desc_producto,
      estado
    });

    res.json(tipoProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la categoria: ', error });
  }
};

exports.deactivateTipoProduct = async (req, res) => {
    try {
        const tipoProductId = req.params.id;
        const tipoProduct = await TipoProduct.findByPk(tipoProductId);

        if (!tipoProduct) {
            return res.status(404).json({ error: 'categoria no encontrada.' });
        }

        tipoProduct.estado = 2;
        await tipoProduct.save();

        res.json({ message: 'Estado de la categoria actualizada correctamente.', tipoProduct });
    } catch (error) {
        console.error('Error al actualizar el estado de la categoria:', error);
        res.status(500).json({ error: 'Error al actualizar el estado de la categoria.' });
    }
};
