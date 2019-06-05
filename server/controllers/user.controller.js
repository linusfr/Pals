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

async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}

async function editUser(id, fullName, userEmail) {
  let oldUser = await User.findOne({ _id: id });
  oldUser.fullname = fullName;
  oldUser.email = userEmail;

  return await User.replaceOne({ _id: id }, oldUser);
}

async function getActiveUser(userID) {
  let user = await User.find({ _id: userID });

  let returnUser = {
    _id: user[0]._id,
    fullname: user[0].fullname,
    email: user[0].email
  };

  return returnUser;
}
