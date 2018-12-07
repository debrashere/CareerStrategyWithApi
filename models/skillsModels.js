'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const skillSchema = mongoose.Schema({
    skill: { type: String, required: true,  unique: true },
    description: { type: String }
});

skillSchema.methods.serialize = function() {
  return {
    skill: this.skill || '',
    description: this.description || ''
  };
};

const Skill = mongoose.model('Skill', skillSchema);

module.exports = {Skill};
