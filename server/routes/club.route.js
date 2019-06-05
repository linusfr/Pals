const express = require('express');
const asyncHandler = require('express-async-handler');
const clubCtrl = require('../controllers/club.controller');
const config = require('../config/config');

const router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
  let clubs = await clubCtrl.getClubs();
  res.json(clubs);
});

router.get('/joined', async (req, res) => {
  let clubs = await clubCtrl.getJoinedClubs(req.query.userID);
  res.json(clubs);
});

router.get('/detailedClub', async (req, res) => {
  let club = await clubCtrl.getDetailedClub(req.query.userID, req.query.clubID);
  res.json(club);
});

router.post('/add', async (req, res) => {
  let club = req.body;
  let newClub = await clubCtrl.addClub(club);
  res.json(newClub);
});

router.post('/edit', async (req, res) => {
  let club = req.body;
  let editedClub = await clubCtrl.editClub(club);
  res.json(editedClub);
});

router.post('/addMember', async (req, res) => {
  let { club, activeUser } = req.body;
  let newClub = await clubCtrl.addMember(club, activeUser);
  res.json(newClub);
});

router.post('/removeMember', async (req, res) => {
  let { club, activeUser } = req.body;
  let newClub = await clubCtrl.removeMember(club, activeUser);
  res.json(newClub);
});

router.get('/search', async (req, res) => {
  let clubs = await clubCtrl.getClubsByName(req.query.name, req.query.category);
  res.json(clubs);
});
