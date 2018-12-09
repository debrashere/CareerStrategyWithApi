'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const { PORT, DATABASE_URL } = require('./config');
const app = express();

const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const userProfileRouter = require('./routes_folder/userProfileRouter');
const prospectsRouter = require('./routes_folder/prospectsRouter');
const rolesRouter = require('./routes_folder/rolesRouter')
const skillsRouter = require('./routes_folder/skillsRouter');

mongoose.Promise = global.Promise;

// Logging
app.use(morgan('common'));


// CORS
    app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE'); 
    if (req.method === 'OPTIONS') {
      return res.send(204);
    }
    next();
  });

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(morgan('common'));
app.use(express.json());

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);
app.use('/api/userprofiles/', userProfileRouter);
app.use('/api/prospects/', prospectsRouter);
app.use('/api/skills/', skillsRouter);
app.use('/api/roles/', rolesRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'URL Not Found' });
});

// Referenced by both runServer and closeServer. closeServer
// assumes runServer has run and set `server` to a server object
let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}
if (require.main === module) {
  console.log("SERVER.JS connecting to DATABASE_URL", DATABASE_URL);
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
