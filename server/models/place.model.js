const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  postalCode: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Place', placeSchema);
