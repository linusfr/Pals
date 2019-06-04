const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  administrator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  place: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  time: {
    type: String
  },
  creationDate: {
    type: String
  },
  brief: {
    type: String,
    required: true
  },
  member: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  ]
});

module.exports = mongoose.model('Club', clubSchema);
