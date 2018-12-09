'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const skillSchema = mongoose.Schema({
    skill: { type: String, required: true,  unique: true },
    description: { type: String },
    date: { type: Date, required: true}
});

skillSchema.methods.serialize = function() {
  return {
    id: this._id,
    skill: this.skill || '',
    description: this.description || '',
    date: this.date
  };
};

const Skill = mongoose.model('Skill', skillSchema);

module.exports = {Skill};
