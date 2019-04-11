const mongoose = require('mongoose');

const TimeSchema = new mongoose.Schema({
  month: {
    type: Number,
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  hour: {
    type: Number,
    required: true
  },
  minute: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Time', UserSchema);
