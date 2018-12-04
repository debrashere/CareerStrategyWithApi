'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {Link, Role} = require('./commonModels');
const linkSchema = mongoose.model('Link').schema;

const userSkillSchema = mongoose.Schema({    
    skill: { type: String, required: true },
    yearsOfExperience: { type: Number}    
});

const userProfileSchema = mongoose.Schema({
  firstName:  { type: String, required: true },
  lastName: { type: String, required: true },
  email:  { type: String, required: true },
  userId: {type: String, required: true },
  phone:  { type: String},  
  skills: [userSkillSchema],
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] 
});

userSkillSchema.pre('find', function(next) {
  this.populate('skill');
  next();
});

userSkillSchema.pre('findOne', function(next) {
  this.populate('skill');
  next();
});

userProfileSchema.pre('find', function(next) {
  this.populate('skills');
  next();
});

userProfileSchema.pre('findOne', function(next) {
  this.populate('skills');
  next();
});

userProfileSchema.pre('find', function(next) {
  this.populate('roles');
  next();
});

userProfileSchema.pre('findOne', function(next) {
  this.populate('roles');
  next();
});

userSkillSchema.methods.serialize = function() {
  return {
    id: this._id,
    skill: this.skill, 
    yearsOfExperience: this.yearsOfExperience 
  };
}; 
 
userProfileSchema.methods.serialize = function() {
  return {
    id: this._id,
    firstName: this.firstName || "",
    lastName: this.lastName || "",
    email:  this.email || "",
    userId: this.userId || "",
    phone: this.phone || "",
    skills: this.skills || [],
    roles: this.roles  || []
  };
}; 

const UserProfile = mongoose.model('UserProfile', userProfileSchema);
module.exports = {UserProfile};
