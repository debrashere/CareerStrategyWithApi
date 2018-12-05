'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
 
const jobSkillsSchema = mongoose.Schema({
  skill: { type: String, required: true },
  required: { type: Boolean },
  yearsOfExperience:{ type: Number }
});

const jobProspectSchema = mongoose.Schema({
    what:  { type: String, required: true},
    where: { type: String, required: true },
    when:  { type: String, required: true},
    userId: {type: String, required: true},
    status: { type: String},
    source:   { type: String},
    sourceUrl:  { type: String},
    dayToDay: { type: String},    
    contact: { type: String},   
    comments: { type: String},
    details:  { type: String },
    jobSkills: [jobSkillsSchema]
});

jobProspectSchema.methods.serialize = function() {
  return {
    id: this._id,
    what: this.what || '',
    where: this.where ||  {}, 
    when: this.when,
    userId: this.userId,
    status: this.status || '',
    source: this.source || '',
    sourceUrl: this.sourceUrl || '',
    dayToDay:this.dayToDay || '',
    contact:this.contact || [],
    comments:this.comments || '',
    details:this.details || '',
    jobSkills:this.jobSkills || []
  };
};

const JobProspect = mongoose.model('JobProspect', jobProspectSchema);

module.exports = {JobProspect};
