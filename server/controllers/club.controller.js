const Club = require('../models/club.model');

module.exports = {
  getClubs
};

async function getClubs() {
  return await Club.find({});
}

// async function getMemberClubs(id) {}
