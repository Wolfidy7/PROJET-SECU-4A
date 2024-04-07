const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  router.get('/', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM users');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Ajoutez d'autres routes ici si nécessaire.

  return router;
};
