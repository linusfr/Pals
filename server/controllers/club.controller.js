const Club = require('../models/club.model');

module.exports = {
  getClubs,
  addClub,
  getDetailedClub
};

async function addClub(club) {
  return await new Club(club).save();
}

async function getClubs() {
  let clubs = await Club.find({});
  let filteredClubs = [];
  for (let i = 0; i < clubs.length; i++) {
    filteredClubs[i] = { name: clubs[i].name, brief: clubs[i].brief };
  }
  return filteredClubs;
}

async function getDetailedClub(userID, clubID) {
  return await Club.find({ _id: clubID });
}

// async function getMemberClubs(id) {}
