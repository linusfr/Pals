//--------------------------------------------------------------------
//Hier ist das Schema für die Clubs hinterlegt.
//Dieses Schema muss mindestens einen Administrator, Namen, Kategorie,
//Beschreibung, Kurzbeschreibung und die Clubmitglieder enthalten.
//--------------------------------------------------------------------

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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  place: {
    type: String
  },
  imgURL: {
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
