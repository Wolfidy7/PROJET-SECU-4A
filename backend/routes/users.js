const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  // Route to check if the user is authenticated
  router.get('/isAuthenticated', (req, res) => {
    if (req.kauth && req.kauth.grant) {
      res.json({ authenticated: true });
    } else {
      res.json({ authenticated: false });
    }
  });

  // Route to check if the user is an admin
  router.get('/isAdmin', async (req, res) => {
    if (!req.kauth || !req.kauth.grant) {
      return res.status(403).send('Access denied');
    }

    const userId = req.kauth.grant.access_token.content.sub;

    try {
      const result = await pool.query(
        'SELECT r.nom FROM users u JOIN roles r ON u.id_role = r.id_role WHERE u.id_user = $1',
        [userId]
      );

      const role = result.rows[0] ? result.rows[0].nom : null;
      res.json({ isAdmin: role === 'admin' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return router;
};
