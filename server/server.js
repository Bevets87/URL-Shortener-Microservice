const express = require('express');
const mongoose = require('mongoose');
const urlDatabase = require('../models/urlDatabase');
const bodyParser = require('body-parser');
var app = express();

app.use('/', express.static('client'));
app.use('/css', express.static('node_modules/bootstrap/dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/shorten', function(req, res){
console.log(req.body)

});







app.listen(3000);
