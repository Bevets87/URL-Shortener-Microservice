const mongoose = require('mongoose');
const Schema = mongoose.Schema

// create schema and model
const urlSchema = new Schema({
  original_url: {
    type: String
  },
 short_url: {
   type: String
  }
 });

const url = mongoose.model('url', urlSchema);

module.exports = url;
