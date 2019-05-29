'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
 
const jobSkillsSchema = mongoose.Schema({
  skill: { type: String, required: true },
  required: { type: Boolean },
  yearsOfExperience:{ type: Number }
});

const contactsSchema = mongoose.Schema({
  company: {type: String, required: true },
  contactType: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String }, 
  comment: { type: String },
  email: { type: String },
  phone:{ type: String }
});
 
const statusHistorySchema = mongoose.Schema({
  date: { type: Date, required: true },
  status: { type: String, required: true },
  comment:{ type: String }
});

const challengeSchema = mongoose.Schema({
  challengeType: {type: String, require: true},
  dateRequested: {type: Date, required: true},
  dateCompleted: {type: Date, required: false},
  comments: { type: String, required: false},
  url: { type: String, required: false},
  results: {type: String, required: false},
  langquage: {type: String, required: false},
  companyUrl: {type: String, required: false}
});

const jobProspectSchema = mongoose.Schema({
    what:  { type: String, required: true},
    where: { type: String, required: true },
    when:  { type: String, required: true},
    userId: {type: String, required: true},
    source:   { type: String},
    sourceUrl:  { type: String},
    companyUrl:  { type: String},
    dayToDay: { type: String},     
    comments: { type: String},
    details:  { type: String },
    jobSkills: [jobSkillsSchema],
    statusHistory: [statusHistorySchema],
    contacts: [contactsSchema],
    challenges: [challengeSchema]
});

challengeSchema.methods.serialize = function() {
  return {
    id: this._id,
    challengetype: this.challengetype,
    userId: this.userId,   
    prospectId: this.prospectId,
    dateRequested: this.dateRequested,
    dateCompleted: this.dateCompleted,
    comments: this.comments ||  '', 
    url: this.url || '',
    results: this.results || '',
    langquage: this.langquage || '',
    companyUrl: this.companyUrl || ''
  };
};

jobProspectSchema.methods.serialize = function() {
  return {
    id: this._id,
    what: this.what || '',
    where: this.where ||  {}, 
    when: this.when,
    userId: this.userId,
    source: this.source || '',
    sourceUrl: this.sourceUrl || '',
    companyUrl: this.sourceUrl || '',    
    dayToDay:this.dayToDay || '',
    comments:this.comments || '',
    details:this.details || '',
    jobSkills:this.jobSkills || [],
    statusHistory: this.statusHistory ||  [],
    contacts:this.contacts || [],
    challenges: this.challenges || []
  };
};

const JobProspect = mongoose.model('JobProspect', jobProspectSchema);

module.exports = {JobProspect};
