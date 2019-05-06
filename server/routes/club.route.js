const express = require('express');
const asyncHandler = require('express-async-handler');
const clubCtrl = require('../controllers/club.controller');
const config = require('../config/config');

const router = express.Router();
module.exports = router;

router.get('/test', asyncHandler(getClubs));

console.log('test');

async function getClubs(req, res) {
  console.log('server works');
  let clubs = { works: true };
  res.json(clubs);
}

// const userCtrl = require('../controllers/user.controller');
// const authCtrl = require('../controllers/auth.controller');

// router.get('/me', passport.authenticate('jwt', { session: false }), login);

// async function register(req, res, neclubs'xt) {
//   let user = await userCtrl.insert(req.body);
//   user = user.toObject();
//   delete user.hashedPassword;
//   req.user = user;
//   next();
// }

// function login(req, res) {
//   let user = req.user;
//   let token = authCtrl.generateToken(user);
//   res.json({ user, token });
// }
