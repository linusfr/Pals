const Club = require('../models/club.model');
const Category = require('../models/category.model');
const categoryCtrl = require('./category.controller');

module.exports = {
  getClubs,
  addClub,
  getDetailedClub,
  getJoinedClubs
};

async function addClub(club) {
  let categoryExists = await categoryCtrl.categoryExists({
    name: club.category
  });

  if (categoryExists === false) {
    club.category = await categoryCtrl.addCategory({ name: club.category })._id;
  } else {
    console.log('categoryExists', categoryExists);
    club.category = categoryExists._id;
  }

  club = await new Club(club).save();
  return club;
}

async function getClubs() {
  let clubs = await Club.find({});

  let filteredClubs = clubs.map(({ _id, name, brief }) => {
    return { _id, name, brief };
  });

  return filteredClubs;
}

async function getJoinedClubs(id) {
  let clubs = await Club.find({ member: id });

  let filteredClubs = clubs.map(({ _id, name, brief }) => {
    return { _id, name, brief };
  });

  return filteredClubs;
}

async function getDetailedClub(userID, clubID) {
  return await Club.find({ _id: clubID }).populate('administrator');
}
