"use strict";
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();
const { JobProspect} = require('../models/jobProspectsModels');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

//router.get('/', jwtAuth, (req, res) => {
router.get("/:id", (req, res) => { 
  console.log("prospect routher findd", "start");   
    JobProspect.findOne({_id: req.params.id})   
    .then(prospect => {
      console.log( "prospect routher findOne", prospect);
      if (!prospect || prospect.length == 0) {
        const message = `Id "${req.params.id}" not found`;
        console.warn(message);
        return res.status(204).send(message);
      }
      console.log(`"found profile by id "${req.params.id}"`);
      res.json({
        prospect: prospect.map(prospects => prospects.serialize())
      });
    })
    .catch(err => {
        console.error(err);
        console.log("prospect routher error", err);
        res.status(500).json({ message: "Internal server error" });
    });
  });    
    
router.get("/", (req, res) => {
    JobProspect.find()    
    .then(prospect => {
        res.json({
            prospect: prospect.map(prospects => prospects.serialize())
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  });

router.post("/", jsonParser, (req, res) => {
  console.log("prospect router req.body", req.body);
  const requiredFields = ["userId", "what", "where", "when", "status", "userId" ];
  for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
          const message = `Missing \`${field}\` in request body`;
          console.error(message);
          return res.status(400).send(message);
      }
  }

  JobProspect
  .find({ userId: req.body.userId, what: req.body.what, where: req.body.where })
  .then(prospect => {
      if (prospect && prospect.length > 0) {      
          res.status(500).json({ error: `prospect "${req.body.what}" already exists`})
      }
      else {  
          JobProspect
          .create({              
              what: req.body.what,
              where: req.body.where,
              when: req.body.when,
              userId: req.body.userId,
              status: req.body.status,
              source: req.body.source,
              sourceUrl: req.body.sourceUrl,
              dayToDay: req.body.dayToDay,
              contact: req.body.contact,
              comments: req.body.comments,
              details: req.body.details,
              jobSkills: req.body.jobSkills      
            }) 
          .then( prospect => res.status(201).json(prospect.serialize()))                       
          .catch(err => {
              console.error(err);
              res.status(500).json({ error: 'Something went wrong posting job prospect' });
          })        
      } 
      })
});

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
    const updateableFields = [ "what", "where", "when", "status", "source", "sourceUrl",
    "dayToDay", "contact", "comment", "details", "jobSkills"];
  
    updateableFields.forEach(field => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });
  
    JobProspect
      // all key/value pairs in toUpdate will be updated -- that's what `$set` does
      .findByIdAndUpdate(req.params.id, { $set: toUpdate })
      .then(prospect => res.status(204).end())
      .catch(err => res.status(500).json({ message: "Internal server error" }));
  });
  
  router.delete("/:id", (req, res) => {
    JobProspect.findByIdAndRemove(req.params.id)
      .then(prospect => res.status(204).end())
      .catch(err => res.status(500).json({ message: "Internal server error" }));
  });

module.exports = router;