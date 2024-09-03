const Bedroom = require('../models/bedrooms');

// Crear una nueva habitación
exports.createBedroom = async (req, res) => {
  try {
    const newRoom = new Bedroom({
      title: req.body.title,
      description: req.body.description,
      fullDescription: req.body.fullDescription,
      host: req.body.host,
      price: req.body.price,
      service: req.body.service, // Asegúrate de que este campo se envíe correctamente
      category: req.body.category,
      location: req.body.location,
      image: req.body.image 
    });

    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    console.error('Error creating bedroom:', error); // Agrega un mensaje de error más detallado
    res.status(500).json({ error: error.message });
  }
};


// Obtener todas las habitaciones de un usuario anfitrión
exports.getAllBedroomsByHost = async (req, res) => {
  try {
    const { host } = req.params; // Obtener el anfitrión desde los parámetros de la URL
    const bedrooms = await Bedroom.find({ host }); // Buscar habitaciones por el campo 'host'

    if (bedrooms.length === 0) {
      return res.status(404).json({ message: 'No se encontraron habitaciones para este anfitrión' });
    }

    res.status(200).json(bedrooms);
  } catch (error) {
    console.error('Error fetching bedrooms:', error);
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una habitación por ID
exports.deleteBedroom = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de la habitación desde los parámetros de la URL
    const deletedRoom = await Bedroom.findByIdAndDelete(id); // Eliminar la habitación por su ID

    if (!deletedRoom) {
      return res.status(404).json({ message: 'Habitación no encontrada' });
    }

    res.status(200).json({ message: 'Habitación eliminada exitosamente' });
  } catch (error) {
    console.error('Error deleting bedroom:', error);
    res.status(500).json({ error: error.message });
  }
};