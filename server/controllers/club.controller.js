const Club = require('../models/club.model');
const Category = require('../models/category.model');
const categoryCtrl = require('./category.controller');

module.exports = {
  getClubs,
  getClubsByName,
  addClub,
  editClub,
  getDetailedClub,
  getJoinedClubs,
  addMember,
  removeMember
};

async function addClub(club) {
  let categoryExists = await categoryCtrl.categoryExists({
    name: club.category
  });
  if (categoryExists === false) {
    club.category = await categoryCtrl.addCategory({ name: club.category })._id;
  } else {
    club.category = categoryExists._id;
  }

  club = await new Club(club).save();
  return club;
}

async function editClub(club) {
  // alten Club rausziehen
  let oldClub = await Club.findOne({ _id: club.changedID });

  // Geänderte Felder überarbeiten
  oldClub.brief = club.brief;
  oldClub.description = club.description;
  oldClub.time = club.time;
  oldClub.place = club.place;

  // alten Club überschreiben
  let res = await Club.replaceOne({ _id: club.changedID }, oldClub);
  return oldClub;
}

async function getClubs() {
  let clubs = await Club.find({});

  let filteredClubs = clubs.map(({ _id, name, brief }) => {
    return { _id, name, brief };
  });

  return filteredClubs;
}

async function getClubsByName(name) {
  let clubs = await Club.find({
    name: { $regex: name, $options: 'i' }
  });

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
  return await Club.find({ _id: clubID })
    .populate('administrator')
    .populate('category');
}

async function addMember(club, activeUser) {
  club.member.push(activeUser);
  await Club.replaceOne({ _id: club._id }, club)
    .populate('administrator')
    .populate('category');
  return await Club.findOne({ _id: club._id })
    .populate('administrator')
    .populate('category');
}

async function removeMember(club, activeUser) {
  club.member.push(activeUser);
  club.member.forEach((val, index) => {
    val === activeUser ? club.member.splice(index) : null;
  });
  await Club.replaceOne({ _id: club._id }, club)
    .populate('administrator')
    .populate('category');
  return await Club.findOne({ _id: club._id })
    .populate('administrator')
    .populate('category');
}
