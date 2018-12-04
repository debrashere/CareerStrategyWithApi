"use strict";
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();
const passport = require('passport');
const { Company} = require('../models/companyModels');
const jwtAuth = passport.authenticate('jwt', { session: false });

//router.get('/', jwtAuth, (req, res) => {
  router.get("/", (req, res) => {
    Company.find() 
      .then(company => {
        res.json({
            company: company.map(companies => companies.serialize())
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  });

router.post("/", jsonParser, (req, res) => {
let devType = [];
const requiredFields = ["company", "city", "state" ];
for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
    }
}

Company
.find({ company: req.body.company  })
.then(company => {
    if (company && company.length > 0) {      
        res.status(500).json({ error: `Company "${req.body.name}" already exists`})
     }
     else {      
        Company
        .create({
            company: req.body.company,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            phone: req.body.phone,
            description: req.body.description,
            links: req.body.links, 
            })                      
        .then( company => res.status(201).json(company.serialize()))                 
        .catch( err => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        })        
    }  
})
.catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong posting company' });
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
    const updateableFields = ["company", "city", "state", "zip", "phone", "description"];
  
    updateableFields.forEach(field => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });
  
    Company
      // all key/value pairs in toUpdate will be updated -- that's what `$set` does
      .findByIdAndUpdate(req.params.id, { $set: toUpdate })
      .then(company => res.status(204).end())
      .catch(err => res.status(500).json({ message: "Internal server error" }));
  });
  
  router.delete("/:id", (req, res) => {
    Company.findByIdAndRemove(req.params.id)
      .then(Company => res.status(204).end())
      .catch(err => res.status(500).json({ message: "Internal server error" }));
  });

module.exports = router;