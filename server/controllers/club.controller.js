const Club = require('../models/club.model');
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
  //Mittels CategoryController wird überprüft, ob die hinzuzufügende Kategorie schon existiert
  let categoryExists = await categoryCtrl.categoryExists({
    name: club.category
  });
  //Falls die Kategorie nicht existiert, wird sie über den CategoryController in die Datenbank eingetragen
  //Ansonsten wird die ID der Kategorie übermittelt
  if (categoryExists === false) {
    club.category = await categoryCtrl.addCategory({ name: club.category })._id;
  } else {
    club.category = categoryExists._id;
  }

  try {
    club = await new Club(club).save();
  } catch {
    club = 'error';
  }
  return club;
}

async function editClub(club) {
  //Der alte Club wird aufgerufen
  let oldClub = await Club.findOne({ _id: club.changedID });

  //Geänderte Felder werden überarbeitet
  oldClub.brief = club.brief;
  oldClub.description = club.description;
  oldClub.time = club.time;
  oldClub.place = club.place;

  //Der alte Club wird überschrieben
  let res = await Club.replaceOne({ _id: club.changedID }, oldClub);
  return oldClub;
}

async function getClubs() {
  let clubs = await Club.find({});

  let filteredClubs = clubs.map(({ _id, name, brief, imgURL }) => {
    return { _id, name, brief, imgURL };
  });

  return filteredClubs;
}

async function getClubsByName(name, category) {
  let categoryID = '';
  let categories = await categoryCtrl.getCategories();
  categories.forEach(value => {
    if (value.name === category) {
      categoryID = value._id;
    }
  });

  let clubs;

  if (categoryID === '') {
    clubs = await Club.find({
      name: { $regex: name, $options: 'i' }
    });
  } else {
    clubs = await Club.find({
      name: { $regex: name, $options: 'i' },
      category: categoryID
    });
  }

  let filteredClubs = clubs.map(({ _id, name, brief, imgURL }) => {
    return { _id, name, brief, imgURL };
  });

  return filteredClubs;
}

async function getJoinedClubs(id) {
  let clubs = await Club.find({ member: id });

  let filteredClubs = clubs.map(({ _id, name, brief, imgURL }) => {
    return { _id, name, brief, imgURL };
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
