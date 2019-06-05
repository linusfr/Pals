const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').post(asyncHandler(insert));

router.get('/activeUser', async (req, res) => {
  console.log('test', req.query.userID);
  let user = await userCtrl.getActiveUser(req.query.userID);
  res.json(user);
});

router.post('/edit', async (req, res) => {
  let { id, fullName, userEmail } = req.body;
  let success = await userCtrl.editUser(id, fullName, userEmail);
  res.json(success);
});

async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}
