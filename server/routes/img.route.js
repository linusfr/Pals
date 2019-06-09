//benötigte Wrapper Library
const PexelsAPI = require('pexels-api-wrapper');
const express = require('express');
const config = require('../config/config');
const router = express.Router();
module.exports = router;

//Client instanz bilden durch erzeugen eines API keys
const pexelsClient = new PexelsAPI(
  '563492ad6f91700001000001d6010444517a44dab4d3ea7b859f0d40'
);

router.get('/', async (req, res) => {
  let categoryName = req.query.categoryName;

  // Holt 50 Bilder für die angebebene Kategorie
  // Wählt zufällig eines davon aus und gibt dessen URL zurück.
  let data = await pexelsClient.search(categoryName, 50, 1);
  let randomNumber = Math.floor(Math.random() * data.photos.length);

  res.json(data.photos[randomNumber].src.large2x);
});
