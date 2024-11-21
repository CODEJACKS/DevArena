const mysql = require('mysql');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'devarena'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;
