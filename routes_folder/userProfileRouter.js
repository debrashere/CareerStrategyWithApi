"use strict";
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();
const { Skill} = require('../models/skillsModels');
const { UserProfile} = require('../models/userProfileModels');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

router.get("/:id", (req, res) => {
    UserProfile.findOne({_id: req.params.id})
    //.populate('jobProspects').exec()    
    .then(userProfile => {
      if (!userProfile || userProfile.length == 0) {
        const message = `Id "${req.params.id}" not found`;
        console.error(message);
        return res.status(204).send(message);
      }
      console.log(`"found profile by id "${req.params.id}"`);
      res.json({
          userProfile: userProfile.serialize()
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
  });    

router.get('/', (req, res) => {
  const authHeaders = req.get("Authorization");
    UserProfile.find() 
      //.populate('jobProspects').exec()    
      .then(userProfile => {
        res.json({
            userProfile: userProfile.map(profiles => profiles.serialize())
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  });

router.post("/", jsonParser, (req, res) => {
const requiredFields = ["firstName", "lastName", "email" ];
for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
    }
}

UserProfile
.find({ firstName: req.body.firstName, lastName: req.body.lastName })
.then(userProfile => {
    if (userProfile && userProfile.length > 0) {   
        console.log("USER PROFILE POST ",`UserProfile "${req.body.firstName}" already exists`);
        res.status(500).json({ error: `UserProfile "${req.body.firstName}" already exists`})
     }
     else {           
        UserProfile
        .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,         
            phone:   req.body.phone,
            skills:  req.body.skills,
            roles:  req.body.roles,
            userId: req.body.userId,   
            jobProspects: req.body.jobProspects         
            })                      
        .then( userProfile => {
          const profileUser = userProfile.serialize();
          console.log("aaaaaa profile router profileUser", profileUser);                
               res.status(201).json(profileUser) })    
        .catch( err => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        })        
    }  
})
.catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong posting user profile' });
    })        
})

router.put("/:id", jsonParser, (req, res) => {
    // ensure that the id in the request path and the one in request body match
    console.log("profile put id, body id", req.params.id + "  -  " + req.body.id);
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
      const message =
        `Request path id (${req.params.id}) and request body id ` +
        `(${req.body.id}) must match  debug ------------ [${req.body}]`;
      console.error(message);
      return res.status(400).json({ message: message });
    }
  
    // we only support a subset of fields being updateable.
    // if the user sent over any of the updatableFields, we udpate those values
    // in document
    const toUpdate = {};
    const updateableFields = ["firstName", "lastName", "email", "links", "roles", "skills", "jobProspects" ];
  
    updateableFields.forEach(field => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });
  
    console.log("userProfileRouter toUpdate", toUpdate);
    if (!toUpdate || toUpdate == {}) {
      const message =
        `The input did not contains any updateable fields. ` +
        `Must contain one or more of the following: (${updateableFields}).`;
      console.error(message);
      return res.status(400).json({ message: message });
    }

    // check if skills are to be updated 
    // if so check if each skill is in the master list of skills and add it if not
    if (req.body.skills && req.body.skills.length > 0) {
      req.body.skills.forEach(skillUpdate => {
        Skill.find({ skill: skillUpdate.skill})
        .then(thisSkill => {
          if (!thisSkill || thisSkill.length == 0) {
              Skill
              .create({
                  skill: skillUpdate.skill,
                  description: "",
                  links: ""
                  })                      
              .then( skill => res.status(201).json(skill.serialize()))                 
              .catch( err => {
                  console.error(err);
                  res.status(500).json({ error: 'Something went wrong' });
              })        
            }        
        })
      });
    }
    console.log("profile put executing findByIdAndUpdate toUpdate", toUpdate);
    UserProfile
      // all key/value pairs in toUpdate will be updated -- that's what `$set` does
      .findByIdAndUpdate(req.params.id, { $set: toUpdate }, function(err, docs) {
        if(err){
            var errorMsg = "error: " + err.message;
            console.log(errorMsg);  
            res.status(500).json({ message: "Internal server error" })

        } else {
            console.log("success");
            res.status(204).end()
        }
      })
  });
  
  router.delete("/:id", jwtAuth, (req, res) => {
    UserProfile.findByIdAndRemove(req.params.id)
      .then(UserProfile => res.status(204).end())
      .catch(err => res.status(500).json({ message: "Internal server error" }));
  });

module.exports = router;