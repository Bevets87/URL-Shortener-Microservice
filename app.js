const mongoose = require('mongoose');
const express = require('express');
const index = require('./routes/index.js');
const app = express();

app.use('/', express.static(__dirname + '/client'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/', index);

app.listen(process.env.PORT || 3000);

// connect to db
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/urls');

mongoose.connection.once('open',function(){
  console.log('Connection has been made!')
}).on('error',function(error){
  console.log('Connection error:', error);
});
