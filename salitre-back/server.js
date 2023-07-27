// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Change to your MySQL username
  password: '', // Change to your MySQL password
  database: 'salitre',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE Username = ? AND User_Password = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error performing login:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        // Login successful
        res.json({ success: true });
      } else {
        // Login failed
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
});

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO users (Username, User_Password) VALUES (?, ?)';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error performing registration:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Registration successful
      res.json({ success: true });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
