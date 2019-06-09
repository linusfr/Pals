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

//Funktion, um einen Club hinzuzufügen
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

//Funktion, um einen Club zu bearbeiten
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

//Alle Clubs zurückgeben
async function getClubs() {
  let clubs = await Club.find({});

  let filteredClubs = clubs.map(({ _id, name, brief, imgURL }) => {
    return { _id, name, brief, imgURL };
  });

  return filteredClubs;
}

//Club über den Namen filtern
async function getClubsByName(name, category) {
  let categoryID = '';
  let categories = await categoryCtrl.getCategories();
  //Iteriert durch alle Clubs, und vergleicht den Namen des gesuchten Clubs
  //Ist der richtige Club gefunden, wird dessen ID zurückgegeben
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

  //Die Werte der Clubs werden auf ID, Name, Kurzbeschreibung und URL zu seinem zufällig generierten Bild beschränkt
  let filteredClubs = clubs.map(({ _id, name, brief, imgURL }) => {
    return { _id, name, brief, imgURL };
  });

  return filteredClubs;
}

//Gibt die Clubs zurück, in denen man Mitglied ist
async function getJoinedClubs(id) {
  //Sucht die Clubs, in denen im Member-Feld die ID des angemeldeten Users ist
  let clubs = await Club.find({ member: id });

  //Die Werte der Clubs werden auf ID, Name, Kurzbeschreibung und URL zu seinem zufällig generierten Bild beschränkt
  let filteredClubs = clubs.map(({ _id, name, brief, imgURL }) => {
    return { _id, name, brief, imgURL };
  });

  return filteredClubs;
}

//Sucht einen Club mittels als Parameter übergebener ClubID
async function getDetailedClub(userID, clubID) {
  //
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
