'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const statusSchema = mongoose.Schema({
    status: { type: String, required: true,  unique: true },
    description: { type: String },
    date: { type: Date, required: true}
});

statusSchema.methods.serialize = function() {
  return {
    id: this._id,
    status: this.status || '',
    description: this.description || '',
    date: this.date
  };
};

const Status = mongoose.model('Status', statusSchema);

module.exports = {Status};
