
const Bedroom = require('../models/bedrooms');

exports.getBedroomDetails = async (req, res) => {
  try {
    const bedroom = await Bedroom.findById(req.params.id);
    if (bedroom) {
      res.json(bedroom);
    } else {
      res.status(404).json({ message: 'Habitación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
