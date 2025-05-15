const TipoProduct = require('../models/TipoProducto');

exports.getAllTipoProducto = async (req, res) => {
  try {
    const tipoProducts = await TipoProduct.findAll();
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
        const { desc_producto } = req.body;
        // const imagen = req.file ? req.file.buffer : null;

        if (!desc_producto) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const newTipoProduct = await TipoProduct.create({
            desc_producto
        });

        res.status(201).json(newTipoProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto: ', error });
    }
};

exports.updateTipoProduct = async (req, res) => {
  try {
    const tipoProduct = await TipoProduct.findByPk(req.params.id);
    const idProduct = tipoProduct.id_tipo_producto;

    const {
      desc_producto
    } = req.body;

    await product.update({
      desc_producto
    });

    res.json(tipoProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el tipo producto: ', error });
  }
};

exports.deactivateTipoProduct = async (req, res) => {
    try {
        const tipoProductId = req.params.id;
        const tipoProduct = await TipoProduct.findByPk(tipoProductId);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        tipoProduct.estado = 2;
        await tipoProduct.save();

        res.json({ message: 'Estado del producto actualizado correctamente.', tipoProduct });
    } catch (error) {
        console.error('Error al actualizar el estado del producto:', error);
        res.status(500).json({ error: 'Error al actualizar el estado del producto.' });
    }
};
