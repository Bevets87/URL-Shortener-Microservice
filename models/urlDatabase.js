const mongoose = require('mongoose');
const Schema = mongoose.Schema

// create schema and model

const urlSchema = new Schema({
  originalUrl: String,
  shortenedUrl: String
});

const urlDatabase = mongoose.model('url', urlSchema);

module.exports = urlDatabase;
