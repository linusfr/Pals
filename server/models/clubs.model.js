const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true,
    unique: true
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    // match: [
    //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //     'Please enter a valid email'
    // ]
  },
  thema: {
    type: String,
    required: false,
    unique: false
  },
  beschreibung: {
    type: String,
    required: false,
    unique: false
  },
  // DEPENDS
  //   chat: {
  //     type: String,
  //     required: false,
  //     unique: false
  //   }
  thema: {
    type: String,
    required: false,
    unique: false
  }
});

module.exports = mongoose.model('Club', UserSchema);
