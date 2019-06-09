const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const clubRoutes = require('./club.route');
const categoryRoutes = require('./category.route');
const imgRoutes = require('./img.route');

const router = express.Router();

//hier werden alle Routen verwaltet
router.get('/health-check', (req, res) => res.send('OK'));

//wenn Anfragen zu bestimmten Ereignissen reinkommen, werden diese
//hier an die passenden Routen weitergeleitet
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/clubs', clubRoutes);
router.use('/category', categoryRoutes);
router.use('/image', imgRoutes);

module.exports = router;
