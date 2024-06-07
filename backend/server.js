const express = require('express');
const { Pool } = require('pg');
const userRoutes = require('./routes/users');

const app = express();

const pool = new Pool({
  user: 'postgres',
  host: '172.17.0.1',
  database: 'projetsecu',
  password: 'azerty', 
  port: 5432,
});

pool.connect();


app.use(express.json());
app.use('/api/users', userRoutes(pool));
////////////////////////////////////////////////////CONF OPENID CONNECT////////////////////////////////////////////////

const session = require('express-session');
const Keycloak = require('keycloak-connect');

const memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

const keycloak = new Keycloak({ store: memoryStore }, 'keycloak.json');

app.use(keycloak.middleware());

app.get('/login', keycloak.protect(), (req, res) => {
  if (req.kauth && req.kauth.grant) {
    const user = req.kauth.grant.access_token.content;
    const username = user.preferred_username || user.username;
    res.send(`Hello, ${username}, you are authenticated!`);
  } else {
    res.send('User is not authenticated');
  }
});

app.get('/logout', (req, res) => {
  keycloak.logout(req, res);
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const express = require('express');
// const session = require('express-session');
// const Keycloak = require('keycloak-connect');
// const multer = require('multer');
// const { Pool } = require('pg');
// const path = require('path');

// const app = express();
// const memoryStore = new session.MemoryStore();
// const keycloak = new Keycloak({ store: memoryStore });

// const pool = new Pool({
//   user: 'postgres',
//   host: '172.17.0.1',
//   database: 'postgres',
//   password: 'azerty', 
//   port: 5432,
// });

// app.use(session({
//   secret: 'some secret',
//   resave: false,
//   saveUninitialized: true,
//   store: memoryStore
// }));

// app.use(keycloak.middleware());

// const upload = multer({ dest: 'uploads/' });

// app.post('/upload', keycloak.protect('realm:admin'), upload.single('file'), async (req, res) => {
//   const userId = req.kauth.grant.access_token.content.sub;
//   const { filename, path: filePath } = req.file;

//   try {
//     const result = await pool.query(
//       'INSERT INTO files (filename, path, owner_id, permissions) VALUES ($1, $2, (SELECT id FROM users WHERE keycloak_id = $3), $4) RETURNING *',
//       [filename, filePath, userId, JSON.stringify({ [userId]: 'owner' })]
//     );
//     res.json({ message: 'File uploaded successfully', file: result.rows[0] });
//   } catch (err) {
//     res.status(500).json({ error: 'Database error', details: err });
//   }
// });

// app.get('/files/:id', keycloak.protect(), async (req, res) => {
//   const fileId = req.params.id;
//   const userId = req.kauth.grant.access_token.content.sub;

//   try {
//     const result = await pool.query(
//       'SELECT * FROM files WHERE id = $1',
//       [fileId]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'File not found' });
//     }

//     const file = result.rows[0];
//     const permissions = file.permissions;
//     if (!permissions[userId] || !['owner', 'read', 'write'].includes(permissions[userId])) {
//       return res.status(403).json({ error: 'Access denied' });
//     }

//     res.sendFile(path.resolve(file.path));
//   } catch (err) {
//     res.status(500).json({ error: 'Database error', details: err });
//   }
// });

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});


