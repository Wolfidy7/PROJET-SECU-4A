const express = require('express');
// const { Pool } = require('pg');
const userRoutes = require('./routes/users');
const { loginExists } = require('./routes/users')
const app = express();


app.use(express.json());
// app.use('/api/users', userRoutes(pool));
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

app.get('/login', keycloak.protect(), async (req, res) => { // Ajoute async ici
  if (req.kauth && req.kauth.grant) {
    const user = req.kauth.grant.access_token.content;
    const username = user.preferred_username || user.username;

    try {
      const checking = await loginExists(username); // Utilise await pour obtenir la valeur booléenne
      console.log("ok:", checking);

      if (checking) {
        res.redirect('http://localhost:3001/home');
      } else {
        res.redirect('http://localhost:3001/notauth'); // Redirige si le login n'existe pas
      }
    } catch (error) {
      console.error("Error checking login existence:", error);
      res.status(500).send("Server error");
    }

  } else {
    res.redirect('http://localhost:3001/notauth');
  }
});

app.get('/logout', (req, res) => {
  keycloak.logout(req, res);
});

// Route pour récupérer la liste des utilisateurs
app.get('/', (req, res) => {
  const users = [
    { id: 1, login: 'Alice' },
    { id: 2, login: 'Bob' },
    { id: 3, login: 'Charlie' },
  ];
  res.json(users);
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.listen(3000,'0.0.0.0', () => {
console.log('Server is running on port 3000');
});
