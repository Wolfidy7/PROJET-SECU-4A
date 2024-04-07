const express = require('express');
const { Pool } = require('pg');
const userRoutes = require('./routes/users');

const app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'secu4a',
  password: 'azerty', 
  port: 5432,
});

pool.connect();

pool.query('Select * from users', (err, res)=>{
  if (!err){
    console.log(res.rows);
    }else{
      console.log(err.message);
    }
    pool.end;
})



app.use(express.json());
app.use('/api/users', userRoutes(pool));



app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
