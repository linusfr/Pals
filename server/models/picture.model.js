const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: false,
    unique: false
  },
});

module.exports = mongoose.model('Message', messageSchema);
