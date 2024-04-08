const express = require('express');
const { Pool } = require('pg');
const userRoutes = require('./routes/users');

const app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'azerty', 
  port: 5432,
});

pool.connect();


app.use(express.json());
app.use('/api/users', userRoutes(pool));



app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
