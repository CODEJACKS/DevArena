const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware for static files and JSON parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/categories/:category', (req, res) => {
  const category = req.params.category;
  res.render(`categories/${category}`);
});

app.get('/games/:game', (req, res) => {
  const game = req.params.game;
  res.render(`games/${game}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
