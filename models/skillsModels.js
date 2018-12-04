'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Link = require('./commonModels');
const linkSchema = mongoose.model('Link').schema;

const skillSchema = mongoose.Schema({
    skill: { type: String, required: true,  unique: true },
    description: { type: String }, 
    links: [linkSchema],         
});

skillSchema.methods.serialize = function() {
  return {
    skill: this.skill || '',
    description: this.description || '',   
    links:this.links || []
  };
};

const Skill = mongoose.model('Skill', skillSchema);

module.exports = {Skill};
