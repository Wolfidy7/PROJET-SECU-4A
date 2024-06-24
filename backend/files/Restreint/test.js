const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express();
const memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

const keycloak = new Keycloak({ store: memoryStore }, 'keycloak.json');

app.use(keycloak.middleware());

app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

app.get('/login', keycloak.protect(), (req, res) => {
  res.send('Hello, you are authenticated!');
});

app.get('/logout', (req, res) => {
  keycloak.logout(req, res);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

