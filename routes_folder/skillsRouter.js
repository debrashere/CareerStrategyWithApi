"use strict";
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();
const { Skill} = require('../models/skillsModels');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

router.get("/", jsonParser, (req, res) => {   
    if (req.query.skill)
    Skill
    .find({ skill: req.query.skill})
        .then(skill => {
          res.json({
              skill: skill.map(skills => skills.serialize())
          });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ message: "Internal server error" });
        });
  else  
    Skill.find() 
    .then(skill => {
      res.json({
          skill: skill.map(skills => skills.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });    
  });


router.post("/", jsonParser, (req, res) => {
const requiredFields = ["skill" ];
for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
    }
}

Skill
.find({ skill: req.body.skill })
.then(skill => {
    if (skill && skill.length > 0) {      
        res.status(500).json({ error: `Skill "${req.body.skill}" already exists`})
     }
     else {      
        Skill
        .create({
            skill: req.body.skill,
            description: req.body.description,
            links: req.body.links
            })                      
        .then( skill => res.status(201).json(skill.serialize()))                 
        .catch( err => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        })        
    }  
})
.catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong posting developer types' });
    })        
})

router.put("/:id", jwtAuth, jsonParser, (req, res) => {
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
    const updateableFields = ["skill", "description"];
  
    updateableFields.forEach(field => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });
  
    Skill
      // all key/value pairs in toUpdate will be updated -- that's what `$set` does
      .findByIdAndUpdate(req.params.id, { $set: toUpdate })
      .then(skill => res.status(204).end())
      .catch(err => res.status(500).json({ message: "Internal server error" }));
  });
  
  router.delete("/:id", (req, res) => {
    Skill.findByIdAndRemove(req.params.id)
      .then(Skill => res.status(204).end())
      .catch(err => res.status(500).json({ message: "Internal server error" }));
  });
  
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};  
module.exports = router;