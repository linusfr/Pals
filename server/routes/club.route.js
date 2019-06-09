const express = require('express');
const asyncHandler = require('express-async-handler');
const clubCtrl = require('../controllers/club.controller');
const config = require('../config/config');

const router = express.Router();
module.exports = router;

//leitet alle vorhandenen Clubs weiter
router.get('/', async (req, res) => {
  let clubs = await clubCtrl.getClubs();
  res.json(clubs);
});

//hier werden alle Clubs weitergeleitet, denen der Nutzer 
//schon beigetreten ist und sendet dies an den Service
router.get('/joined', async (req, res) => {
  let clubs = await clubCtrl.getJoinedClubs(req.query.userID);
  res.json(clubs);
});

//leitet die detaillierte Ansicht an die Services weiter nach beitritt
router.get('/detailedClub', async (req, res) => {
  let club = await clubCtrl.getDetailedClub(req.query.userID, req.query.clubID);
  res.json(club);
});

//neue Clubs werden an zugehörigen Controller gesendet
router.post('/add', async (req, res) => {
  let club = req.body;
  let newClub = await clubCtrl.addClub(club);
  res.json(newClub);
});

//leitet Änderungen an Clubeinstellungen weiter
router.post('/edit', async (req, res) => {
  let club = req.body;
  let editedClub = await clubCtrl.editClub(club);
  res.json(editedClub);
});

//hier werden neu beigetretende Nutzer eines Clubs weitergeleitet
router.post('/addMember', async (req, res) => {
  let { club, activeUser } = req.body;
  let newClub = await clubCtrl.addMember(club, activeUser);
  res.json(newClub);
});

//leitet gelöschte Mitglieder eines Clubs weiter
router.post('/removeMember', async (req, res) => {
  let { club, activeUser } = req.body;
  let newClub = await clubCtrl.removeMember(club, activeUser);
  res.json(newClub);
});

//leitet Clubs über seinen Namen oder ID weiter um passende Clubs über die Suchfunktiom
//suchen zu können
router.get('/search', async (req, res) => {
  let clubs = await clubCtrl.getClubsByName(req.query.name, req.query.category);
  res.json(clubs);
});
