const bcrypt = require('bcrypt');
const Joi = require('joi');
const Club = require('../models/club.model');

const clubSchema = Joi.object({
  //   fullname: Joi.string().required(),
  //   email: Joi.string().email(),
  //   mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  //   password: Joi.string().required(),
  //   repeatPassword: Joi.string()
  //     .required()
  //     .valid(Joi.ref('password'))
});

module.exports = {
  getClubs,
  getMemberClubs
};

async function getClubs() {
  return 'hello';
  // return await Club.find({});
}

async function getMemberClubs(id) {}
