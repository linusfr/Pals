const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  body: {
    type: String,
    required: false,
    unique: false
  },
  time: {
    type: String,
    requiered: true
  }
});

module.exports = mongoose.model('Message', messageSchema);
