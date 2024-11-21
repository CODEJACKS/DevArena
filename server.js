const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db_config');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
