const mysql = require('mysql');

const dbConfig = {
  host: 'sql5.freesqldatabase.com',
  user: 'sql5746405',
  password: 'evfa1cb7Jp',
  database: 'sql5746405'
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
