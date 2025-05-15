const Product = require('../models/Producto');

exports.getAllProducts = async (req, res) => {
    try {
        const { page = 1, limit = 100 } = req.query;
        const offset = (page - 1) * limit;

        const products = await Product.findAll({
            limit,
            offset,
            where: {
                estado: 1
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
        res.status(500).json({ error: 'Error al obtener el producto.' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { nom_producto, precio_producto, id_plataforma, id_tipo_producto, imagen, correo_asociado, password_asociado } = req.body;
        // const imagen = req.file ? req.file.buffer : null;

        if (!nom_producto || !precio_producto || !id_plataforma || !id_tipo_producto || !imagen) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const newProduct = await Product.create({
            nom_producto,
            precio_producto,
            id_plataforma,
            id_tipo_producto,
            imagen,
            correo_asociado,
            password_asociado
        });

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto.' });
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
      id_tipo_producto,
      correo_asociado,
      pass_asociada,
      imagen
    } = req.body;

    await product.update({
      nom_producto,
      precio_producto,
      id_plataforma,
      id_tipo_producto,
      correo_asociado,
      pass_asociada,
      imagen,
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto: ', error });
  }
};

// En tu archivo de controladores de productos (productController.js)
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