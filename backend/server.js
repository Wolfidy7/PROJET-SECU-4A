const express = require('express');
const path = require('path');
const cors = require('cors');
const { Pool } = require('pg');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express();
const PORT = 3000;

app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: '172.17.0.1',
  database: 'postgres',
  password: 'azerty',
  port: 5432,
});

const getDirectoryStructure = (dirPath) => {
  const result = {
    name: path.basename(dirPath),
    type: 'folder',
    items: []
  };

  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.lstatSync(filePath);

    if (stat.isDirectory()) {
      result.items.push(getDirectoryStructure(filePath));
    } else {
      result.items.push({
        name: file,
        type: 'file',
        path: filePath  // Ajoutez le chemin du fichier
      });
    }
  });

  return result;
};

app.get('/api/files', (req, res) => {
  const directoryPath = path.join(__dirname, '/files'); // Change 'your_directory' to your target directory
  const directoryStructure = getDirectoryStructure(directoryPath);
  res.json(directoryStructure)});


app.get('/api/file-content', (req, res) => {
  const filePath = req.query.path;

  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(500).send('Unable to read file: ' + err);
    }
    const fileType = path.extname(filePath).substring(1);
    res.setHeader('Content-Type', `application/${fileType}`);
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Use bodyParser middleware before multer
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

const uploadDirs = {
  'FT1': '/usr/src/app/files/Public',
  'FT2': '/usr/src/app/files/Interne',
  'FT3': '/usr/src/app/files/Confidentiel',
  'FT4': '/usr/src/app/files/Restreint'
};

// Create directories if they don't exist
Object.values(uploadDirs).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Use express-fileupload middleware
app.use(fileUpload({
  createParentPath: true, // Ensure directory creation
}));

// Endpoint for uploading files
app.post('/api/files/uploads', async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }

    const { file } = req.files;
    const { id_type } = req.body;

    if (!id_type) {
      return res.status(400).json({ error: 'Missing id_type in request body' });
    }

    const uploadDir = uploadDirs[id_type];
    if (!uploadDir) {
      return res.status(400).json({ error: 'Invalid or missing id_type' });
    }

    // Move uploaded file to designated directory
    const fileName = file.name;
    const filePath = path.join(uploadDir, fileName);

    // Begin transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Insert file info into database
      await client.query(
        'INSERT INTO file (nom, id_type, upload_date) VALUES ($1, $2, CURRENT_TIMESTAMP)',
        [fileName, id_type]
      );

      // Commit transaction if insertion is successful
      await client.query('COMMIT');

      // Move the file to the designated directory after successful insertion
      await file.mv(filePath);

      res.json({ message: `File uploaded successfully`, filename: fileName, id_type });
    } catch (error) {
      // Rollback transaction on error
      await client.query('ROLLBACK');
      console.error('Error inserting into database:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      // Release client back to the pool
      client.release();
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to fetch document types
app.get('/api/filetypes', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT id_type, nom FROM filetype');
    console.log("resulat: ", queryResult);
    const fileTypes = queryResult.rows;
    res.json(fileTypes);
  } catch (error) {
    console.error('Error fetching document types:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

