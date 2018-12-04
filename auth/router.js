'use strict';
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
  console.log("auth router req.user", req.body);
  User.findOne({username: req.body.username})
  .then(user => {
    if(user) {    
      const thisUser = user.serialize();
      const authToken = createAuthToken(thisUser); 
      const profileId = !thisUser.userProfileId || thisUser.userProfileId == undefined
           ? "" : thisUser.userProfileId;
      const userAuth = JSON.parse(`{"authToken" : "${authToken}", "id": "${thisUser.id}", "profileId": "${profileId}"}`);      
      console.log("bbbbbbb created token", authToken);
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
