
const Bedroom = require('../models/bedrooms');

exports.getHomeData = async (req, res) => {
  try {
    const bedrooms = await Bedroom.find();
    if (bedrooms.length === 0) {
      return res.status(404).json({ message: 'No bedrooms found' });
    }
    res.json(bedrooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching home data', error: error.message });
  }
};