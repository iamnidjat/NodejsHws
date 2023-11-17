const express = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
let HOST = 3000;

const app = express();

const pool = new Pool({
  user: 'postgres', // change it
  host: 'localhost', //  change it
  database: 'mydatabase',  //  change it
  password: 'admin', //  change it
  port: 5432, //  change it
}); 

const generateAndSaveToken = () => {
  const token = jwt.sign({}, 'your_secret_key');

  const insertTokenQuery = 'INSERT INTO tokens (token) VALUES ($1)';

  pool.query(insertTokenQuery, [token], (err) => {
    if (err) 
    {
      console.error('Error while saving token to the database:', err);
    } 
    else 
    {
      console.log('Token successfully saved to the database');
    }
  });
};

app.get('/generate-token', (req, res) => {
  generateAndSaveToken();
  res.send('Token successfully generated and saved to the database');
});

app.get('/get-token', (req, res) => {
  const clientToken = req.headers.authorization;

  if (!clientToken) {
    return res.status(401).json({ error: 'Token required for access' });
  }

  const getToken = 'SELECT * FROM tokens WHERE token = $1';

  pool.query(getToken, [token], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    res.json({ message: 'Access to protected data granted' });
  });
});

app.listen(HOST, () => {
    console.log('Server is running on http://localhost:3000');
});