const express = require('express');
const asyncHandler = require('express-async-handler');
const clubCtrl = require('../controllers/club.controller');

const router = express.Router();
module.exports = router;

router.post('/', async (req, res) => {
  // let clubs = await clubCtrl.getClubs();

  clubs = { works: true };
  res.json(clubs);
  // res.send();
});

// const userCtrl = require('../controllers/user.controller');
// const authCtrl = require('../controllers/auth.controller');
// const config = require('../config/config');

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
