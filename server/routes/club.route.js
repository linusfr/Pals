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

router.post('/add', async (req, res) => {
  console.log(req.body);
  res.json(req.body);
});
