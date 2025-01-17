const express = require('express');
const router = express.Router();

// Define and handle routes using Express.js
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/categories/:category', (req, res) => {
  const category = req.params.category;
  res.render(`categories/${category}`);
});

router.get('/games/:game', (req, res) => {
  const game = req.params.game;
  res.render(`games/${game}`);
});

module.exports = router;
