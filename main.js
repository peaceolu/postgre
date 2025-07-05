// Description: A simple Express.js application to manage users in a PostgreSQL database.
const express = require('express');
const { Client } = require('pg');


const app = express();
app.use(express.json());

// PostgreSQL connection config
const con = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'demopost',
  password: 'oluomachi2468',
  port: 5432,
});

// Connect to PostgreSQL
con.connect()
  .then(() => console.log('✅ Connected to the database'))
  .catch(err => console.error('❌ Connection error', err.stack));

// ==========================
// 1. CREATE USER (POST)
// ==========================
app.post('/users', (req, res) => {
  const { name, email, age } = req.body;
  const insert_query = 'INSERT INTO users (name, email, age) VALUES ($1, $2, $3)';
  con.query(insert_query, [name, email, age])
    .then(() => res.status(201).send('✅ User created successfully'))
    .catch(err => {
      console.error('Error inserting user', err.stack);
      res.status(500).send('Error inserting user');
    });
});

// ==========================
// 2. READ ALL USERS (GET)
// ==========================
app.get('/users', (req, res) => {
  const select_query = 'SELECT * FROM users';
  con.query(select_query)
    .then(result => res.status(200).json(result.rows))
    .catch(err => {
      console.error('Error fetching users', err.stack);
      res.status(500).send('Error fetching users');
    });
});

// ==========================
// 3. READ USER BY ID (GET)
// ==========================
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const select_query = 'SELECT * FROM users WHERE id = $1';
  con.query(select_query, [id])
    .then(result => {
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).send('User not found');
      }
    })
    .catch(err => {
      console.error('Error fetching user by ID', err.stack);
      res.status(500).send('Error fetching user');
    });
});

// ==========================
// 4. UPDATE USER (PUT)
// ==========================
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  const update_query = 'UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4';
  con.query(update_query, [name, email, age, id])
    .then(result => {
      if (result.rowCount > 0) {
        res.status(200).send('✅ User updated successfully');
      } else {
        res.status(404).send('User not found');
      }
    })
    .catch(err => {
      console.error('Error updating user', err.stack);
      res.status(500).send('Error updating user');
    });
});

// ==========================
// 5. DELETE USER (DELETE)
// ==========================
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const delete_query = 'DELETE FROM users WHERE id = $1';
  con.query(delete_query, [id])
    .then(result => {
      if (result.rowCount > 0) {
        res.status(200).send('✅ User deleted successfully');
      } else {
        res.status(404).send('User not found');
      }
    })
    .catch(err => {
      console.error('Error deleting user', err.stack);
      res.status(500).send('Error deleting user');
    });
});

// ==========================
// 6. START SERVER
// ==========================
app.listen(3000, () => {
  console.log('🚀 Server is running on http://localhost:3000');
});
