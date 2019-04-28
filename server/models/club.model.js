const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    unique: false
  },
  chat: {
    type: String,
    required: false,
    unique: false
  },
  theme: {
    type: String,
    required: false,
    unique: false
  }
});

module.exports = mongoose.model('Club', clubSchema);
