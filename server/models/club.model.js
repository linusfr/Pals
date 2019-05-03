const mongoose = require('mongoose');

// Message = require('./message.model.js');
// User = require('./user.model.js');

const clubSchema = new mongoose.Schema({
  administrator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    unique: false
  },
  time: {
    type: String,
    requiered: true
  },
  creationDate: {
    type: String,
    required: false,
    unique: false
  },
  theme: {
    type: String,
    required: false,
    unique: false
  },
  message: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  member: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  ]
});

module.exports = mongoose.model('Club', clubSchema);
