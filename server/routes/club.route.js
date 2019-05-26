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
  newClub = await clubCtrl.addClub(club);
  console.log('TEST2', newClub);
  res.json(newClub);
});
