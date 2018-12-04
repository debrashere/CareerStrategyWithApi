'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
 
const linkSchema = mongoose.Schema({
  title: { type: String, required: true },
  keywords: { type: String, default: ''}, 
  linktype: { type: String, default: ''},           
  url: { type: String, default: ''}                            
});

const roleSchema = mongoose.Schema({
  role:  { type: String, required: true },
  accessLevel:  { type: String, required: true}
});


linkSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title  || "",
    keywords: this.keywords || "",
    linktype: this.linktype || "",
    url: this.url || ""
  };
};

roleSchema.methods.serialize = function() {
  return {
    id: this._id,
    role: this.title  || "",
    accessLevel: this.accessLevel   || ""
  };
};
 
const Link = mongoose.model('Link', linkSchema);
const Role = mongoose.model('Role', roleSchema);

module.exports = {Link, Role };
