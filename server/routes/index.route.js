const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const clubRoutes = require('./club.route');

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/clubs', clubRoutes);

router.get('/test', async (req, res) => {
  let test = { works: 'test Endpoint works' };
  res.json(test);
});

module.exports = router;
