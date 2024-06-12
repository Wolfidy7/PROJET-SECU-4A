const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '172.17.0.1',
  database: 'postgres',
  password: 'azerty', 
  port: 5432,
});

// module.exports = (pool) => {
//   router.get('/', async (req, res) => {
//     try {
//       const { rows } = await pool.query('SELECT * FROM users');
//       res.json(rows);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });

//   // Ajoutez d'autres routes ici si nécessaire.

//   return router;
// };

async function getAllLogins() {
  const query = 'SELECT login FROM users';
  try {
    const res = await pool.query(query);
    return res.rows.map(row => row.login);
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function loginExists(targetLogin) {
  const logins = await getAllLogins();
  console.log(logins); // Debug: afficher les logins récupérés
  console.log(targetLogin); // Debug: afficher le login cible
  return logins.includes(targetLogin);
}

// Route pour récupérer tous les logins
router.get('/login', async (req, res) => {
  try {
    const logins = await getAllLogins();
    res.json(logins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = {loginExists}; // Export des méthodes
