const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  state: { type: String, required: true },
  municipality: { type: String, required: true }
});

module.exports = mongoose.model('Location', locationSchema);
