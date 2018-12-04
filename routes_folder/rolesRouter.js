"use strict";
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let devType = "";
let devTypes = [];

const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();
const { Role} = require('../models/commonModels');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

//router.get('/', jwtAuth, (req, res) => {
  router.get("/", (req, res) => {
    Role.find() 
      .then(role => {
        res.json({
            role: role.map(roles => roles.serialize())
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  });

router.post("/", jsonParser, (req, res) => {
let devType = [];
const requiredFields = ["role", "accessLevel" ];
for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    console.log("DEBUG1 Role Post req.body",req.body);
    if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
    }
}

Role
.find({ role: req.body.role })
.then(role => {
    if (role && role.length > 0) {      
        res.status(500).json({ error: `Role "${req.body.role}" already exists`})
     }
     else {      
        Role
        .create({
            role: req.body.role,
            accessLevel: req.body.accessLevel
            })                      
        .then( role => res.status(201).json(role.serialize()))                 
        .catch( err => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        })        
    }  
})
.catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong posting role' });
    })        
})

router.put("/:id", jsonParser, (req, res) => {
    // ensure that the id in the request path and the one in request body match
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
      const message =
        `Request path id (${req.params.id}) and request body id ` +
        `(${req.body.id}) must match`;
      console.error(message);
      return res.status(400).json({ message: message });
    }
  
    // we only support a subset of fields being updateable.
    // if the user sent over any of the updatableFields, we udpate those values
    // in document
    const toUpdate = {};
    const updateableFields = ["role", "accessLevel"];
  
    updateableFields.forEach(field => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });
  
    Role
      // all key/value pairs in toUpdate will be updated -- that's what `$set` does
      .findByIdAndUpdate(req.params.id, { $set: toUpdate })
      .then(role => res.status(204).end())
      .catch(err => res.status(500).json({ message: "Internal server error" }));
  });
  
  router.delete("/:id", (req, res) => {
    Role.findByIdAndRemove(req.params.id)
      .then(role => res.status(204).end())
      .catch(err => res.status(500).json({ message: "Internal server error" }));
  });
  
module.exports = router;