const express = require('express');
const asyncHandler = require('express-async-handler');
const categoryCtrl = require('../controllers/category.controller');
const config = require('../config/config');

const router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
  let categories = await categoryCtrl.getCategories();
  res.json(categories);
});

router.post('/add', async (req, res) => {
  let category = req.body;
  newCategory = await categoryCtrl.addCategory(category);
  res.json(newCategory);
});
