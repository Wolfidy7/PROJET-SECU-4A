const express = require('express');
const { Pool } = require('pg');
const userRoutes = require('./routes/users');
const multer = require('multer');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express();

const pool = new Pool({
  user: 'postgres',
  host: '172.17.0.1',
  database: 'projetsecu',
  password: 'azerty', 
  port: 5432,
});

pool.connect();

// Middleware for handling multipart/form-data, which is primarily used for uploading files
const upload = multer({ dest: 'uploads/' });

// Keycloak configuration
const memoryStore = new session.MemoryStore();
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

const keycloak = new Keycloak({ store: memoryStore }, 'keycloak.json');
app.use(keycloak.middleware());

// Endpoint for file upload
// app.post('/api/files/upload', keycloak.protect(), upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   console.log(`File uploaded successfully: ${req.file.filename}`);
//   // Here you can process the uploaded file, save it to the server, and respond with any relevant information
//   res.json({ message: `File uploaded successfully: ${req.file.filename}`, filename: req.file.filename });
// });

// Endpoint to fetch document types
app.get('/api/filetypes', async (req, res) => {
  try {
    // Query the database to fetch document types
    const queryResult = await pool.query('SELECT id_type, nom FROM filetype');
    const fileTypes = queryResult.rows;

    // Send the document types as a JSON response
    res.json(fileTypes);
  } catch (error) {
    console.error('Error fetching document types:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protected user routes
app.use('/api/users', keycloak.protect(), userRoutes(pool));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
