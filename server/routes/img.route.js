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

router.get('/detailedClub', async (req, res) => {
  let club = await clubCtrl.getDetailedClub(req.query.userID, req.query.clubID);
  res.json(club);
});

router.post('/upload', async (req, res) => {
  let img = req.body;
  console.log(req.body);
  res.json(req.body);
});
