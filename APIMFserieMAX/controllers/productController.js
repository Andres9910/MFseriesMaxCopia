const Product = require('../models/Producto');
const { Sequelize } = require('sequelize');

exports.getAllProducts = async (req, res) => {
    try {
        const { page = 1, limit = 100 } = req.query;
        const offset = (page - 1) * limit;
        const { Op } = require("sequelize");

        const products = await Product.findAll({
            limit,
            offset,
            where: {
                estado: {
                    [Op.in]: [1, 3]
                }
            }
        });

        const productsWithImages = products.map(product => ({
            ...product.toJSON(),
            imagen: product.imagen ? `data:image/jpeg;base64,${product.imagen}` : null
        }));

        res.json(productsWithImages);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos de base: ', error });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        const productWithImage = {
            ...product.toJSON(),
            imagen: product.imagen ? `data:image/jpeg;base64,${product.imagen}` : null
        };

        res.json(productWithImage);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto.', error });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { nom_producto, precio_producto, id_plataforma, id_tipo_producto, imagen, estado, correo_asociado, password_asociado } = req.body;

        // Normalizar nombre para evitar errores por espacios o mayúsculas
        const nombreNormalizado = nom_producto.trim().toLowerCase();

        // Validar si ya existe un registro con ese nombre
        const existente = await Product.findOne({
            where: Sequelize.where(
                Sequelize.fn('lower', Sequelize.col('nom_producto')),
                nombreNormalizado
            )
        });

        if (existente) {
            return res.status(409).json({ error: 'El producto ya existe' });
        }

        const newProduct = await Product.create({
            nom_producto,
            precio_producto,
            id_plataforma,
            id_tipo_producto,
            imagen,
            estado,
            correo_asociado,
            password_asociado
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Ya existe un producto con ese nombre' });
        }
        res.status(500).json({ error: 'Error al crear el producto.', detalle: error.message });
    }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    const idProduct = product.id_producto;

    const {
      nom_producto,
      precio_producto,
      id_plataforma,
      id_producto,
      imagen,
      estado,
      correo_asociado,
      password_asociado,
      
    } = req.body;

    await product.update({
      nom_producto,
      precio_producto,
      id_plataforma,
      id_producto,
      imagen,
      estado,
      correo_asociado,
      password_asociado,
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto: ', error });
  }
};

exports.deactivateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        product.estado = 2;
        await product.save();

        res.json({ message: 'Estado del producto actualizado correctamente.', product });
    } catch (error) {
        console.error('Error al actualizar el estado del producto:', error);
        res.status(500).json({ error: 'Error al actualizar el estado del producto.' });
    }
};