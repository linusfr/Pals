const express = require('express');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');

const router = express.Router();
module.exports = router;

router.post('/register', asyncHandler(register), login);

// In Passport können mehrere Methoden definiert werden, auf welche
// Nutzer authentifiziert werden können. Diese sind innerhalb von
// Passport.js in dem Config Ordner definiert.
// Diese kamen vorkonfiguriert mit MeanJS.io,
// und wir haben diese nicht geändert.
// Auch sonst haben wir sowohl an der auth.route, noch an
// dem auth.controller etwas geändert.

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  login
);

router.get('/me', passport.authenticate('jwt', { session: false }), login);

async function register(req, res, next) {
  let user = await userCtrl.insert(req.body);
  user = user.toObject();
  delete user.hashedPassword;
  req.user = user;
  next();
}

function login(req, res) {
  let user = req.user;
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}
