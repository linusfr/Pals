const express = require('express');
const asyncHandler = require('express-async-handler');
const clubCtrl = require('../controllers/club.controller');
const config = require('../config/config');

const router = express.Router();
module.exports = router;

router.get('/test', async (req, res) => {
  let test = { works: 'test Endpoint works' };
  res.json(test);
});
