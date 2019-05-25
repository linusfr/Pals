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

  let filteredClubs = clubs.map(({ _id, name, brief }) => {
    return { _id, name, brief };
  });

  return filteredClubs;
}

async function getDetailedClub(userID, clubID) {
  return await Club.find({ _id: clubID }).populate('administrator');
}
