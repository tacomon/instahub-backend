const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BedroomSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fullDescription: { type: String },
  host: { type: String, required: true },
  price: { type: Number, required: true },
  service: { type: String, required: true }, // Asegúrate de que este campo esté definido
  category: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String } // URL de la imagen
});

module.exports = mongoose.model('Bedroom', BedroomSchema);

