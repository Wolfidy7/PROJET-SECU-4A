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

app.listen(5000, () => {
console.log('Server is running on port 5000');
});

