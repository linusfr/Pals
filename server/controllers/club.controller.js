const Club = require('../models/club.model');

module.exports = {
  getClubs,
  addClub
};

async function addClub(club) {
  return await new Club(club).save();
}

async function getClubs() {
  return await Club.find({});
}

// async function getMemberClubs(id) {}
