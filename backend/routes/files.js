const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const upload = multer({ dest: 'uploads/' });

module.exports = (pool, keycloak) => {
  const router = express.Router();

  // Middleware pour vérifier le rôle admin à partir de la base de données
  async function checkAdmin(req, res, next) {
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
      if (role === 'admin') {
        next();
      } else {
        res.status(403).send('Access denied');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Route pour télécharger un fichier
  router.post('/upload', keycloak.protect(), checkAdmin, upload.single('file'), async (req, res) => {
    const { filename, originalname, path } = req.file;
    const fileId = uuidv4();
    try {
      const result = await pool.query(
        'INSERT INTO file (id_file, nom, id_type) VALUES ($1, $2, $3) RETURNING *',
        [fileId, originalname, 'your_file_type']
      );
      res.json({ message: 'File uploaded successfully', file: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Route pour accéder à un fichier
  router.get('/:id', keycloak.protect(), async (req, res) => {
    const fileId = req.params.id;
    try {
      const result = await pool.query('SELECT * FROM file WHERE id_file = $1', [fileId]);
      const file = result.rows[0];
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }
      res.sendFile(file.path, { root: '.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return router;
};
