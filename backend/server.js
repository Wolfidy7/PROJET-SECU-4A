const express = require('express');
const { Pool } = require('pg');
const userRoutes = require('./routes/users');

const app = express();

const pool = new Pool({
  user: 'postgres',
  host: '172.17.0.1',
  database: 'postgres',
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

app.listen(3000, () => {
console.log('Server is running on port 3000');
});

