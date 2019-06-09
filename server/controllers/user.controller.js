//----------------------------------------------------------------
//Dieser Controller verwaltet alle Datenbankzugriffe für die User
//----------------------------------------------------------------

const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required(),
  repeatPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
});

module.exports = {
  insert,
  getActiveUser,
  editUser
};

//Neuen User hinzufügen
async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  //Hashwert vom Passwort generieren
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  //Nach dem Generieren des Hashwertes wird das ursprüngliche Passwort gelöscht
  delete user.password;
  //Der User wird eingespeichert
  return await new User(user).save();
}

//User bearbeiten
async function editUser(id, fullName, userEmail) {
  let data;
  //Schaut, ob es die E-Mail-Adresse schon gibt
  try {
    data = await User.find({ email: userEmail });
  } catch (e) {
    console.log(e);
  }
  //Falls die E-Mail-Adresse schon existiert
  if (data.length !== 0) {
    return 'emailExists';
  }

  //Sucht den User anhand der ID
  let oldUser = await User.findOne({ _id: id });
  oldUser.fullname = fullName;
  oldUser.email = userEmail;

  //ersetzt die alten Daten mit neuen Daten
  return await User.replaceOne({ _id: id }, oldUser);
}

//Gibt die Daten des aktuell angemeldeten Users zurück
async function getActiveUser(userID) {
  let user = await User.find({ _id: userID });

  let returnUser = {
    _id: user[0]._id,
    fullname: user[0].fullname,
    email: user[0].email
  };

  return returnUser;
}
