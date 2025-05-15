const Plataforma = require('../models/Plataformas');

exports.getAllPlataforma = async (req, res) => {
  try {
    const plataformas = await Plataforma.findAll();
    res.json(plataformas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las plataformas: ' + error });
  }
};