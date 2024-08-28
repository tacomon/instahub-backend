const mongoose = require('mongoose');

const bedroomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fullDescription: { type: String }, // Añadido fullDescription
  host: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
  comentarios: { type: String }, // Añadido comentarios
  criteriosARevisar: { type: [String] }, // Añadido criteriosARevisar (array de strings)
  estatus: { type: String }, // Añadido estatus
  services: { type: [String] } // Añadido services (array de strings)
});

module.exports = mongoose.model('Bedroom', bedroomSchema);


// const mongoose = require('mongoose');

// const bedroomSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   host: { type: String, required: true },
//   location: { type: String, required: true },
//   price: { type: Number, required: true },
//   image: { type: String, required: true },
//   date: { type: String, required: true },
//   category: { type: String, required: true }
// });

// module.exports = mongoose.model('Bedroom', bedroomSchema);