//----------------------------------------------------
//Dies ist das Schema für die User
//Mindestens benötigt werden Name, E-Mail und Passwort
//----------------------------------------------------

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //Die Regex wir verwendet, um Regeln für das E-Mail-Feld festzulegen
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email'
      ]
    },
    //Hier wird das Passwort als Hashwert hinterlegt
    hashedPassword: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    roles: [
      {
        type: String
      }
    ]
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('User', userSchema);
