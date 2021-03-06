'use strict';
var http = require('http')
//var Cookies = require('cookies')
 
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const config = require('../config');
const router = express.Router();

const {User} = require('../users');

const createAuthToken = function(user) {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', {session: false});
router.use(bodyParser.json());
// The user provides a username and password to login
router.post('/login', localAuth, (req, res) => {

  User.findOne({username: req.body.username})
  .then(user => {
    if(user) { 
        // Create a cookies object
       // let keys = [{"token":authToken}];
       // let cookies = new Cookies(req, res, { keys: keys })
       // let cookiesJS = JSON.serialize(cookies);
      const thisUser = user.serialize();
      const authToken = createAuthToken(thisUser);    
      const userAuth = JSON.parse(`{"authToken" : "${authToken}", "id": "${thisUser.id}"}`);           
      res.json({userAuth});
    }
  })
});

const jwtAuth = passport.authenticate('jwt', {session: false});

// The user exchanges a valid JWT for a new one with a later expiration
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

module.exports = {router};
