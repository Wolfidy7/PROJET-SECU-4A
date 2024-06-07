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

// const { Issuer, Strategy, generators } = require('openid-client');
// const passport = require('passport');
// const session = require('express-session');

// // Configurez la session
// app.use(session({
//   secret: 'azerty',
//   resave: false,
//   saveUninitialized: true,
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// // Configurez l'émetteur et la stratégie Passport
// (async () => {
//   const issuer = await Issuer.discover('https://votre.fournisseur.didentite.com');
  
//   const client = new issuer.Client({
//     client_id: 'votre_client_id',
//     client_secret: 'votre_client_secret',
//     redirect_uris: ['http://localhost:5000/callback'],
//     response_types: ['code'],
//   });

//   passport.use('oidc', new Strategy({ client, passReqToCallback: true }, (req, tokenset, userinfo, done) => {
//     // Traitez l'utilisateur et les tokens ici
//     return done(null, userinfo);
//   }));

//   // Sérialisation et désérialisation de l'utilisateur pour la session
//   passport.serializeUser((user, done) => done(null, user));
//   passport.deserializeUser((obj, done) => done(null, obj));
// })();

// // Route pour initier le login OIDC
// app.get('/login', passport.authenticate('oidc'));

// // Route pour le callback après l'authentification
// app.get('/callback', passport.authenticate('oidc', { successRedirect: '/', failureRedirect: '/login' }));

// app.get('/', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.send(`Bonjour ${req.user.name}`);
//   } else {
//     res.send('Non connecté');
//   }
// });

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


