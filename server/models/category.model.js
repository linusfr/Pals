//---------------------------------------------------------------
//Dies ist das Mongoose-Schema für die Kategorien
//Es wird nur ein Name benötigt, dieser ist allerdings notwendig.
//---------------------------------------------------------------

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  }
});

module.exports = mongoose.model('Category', categorySchema);
