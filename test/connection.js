const mongoose = require('mongoose');

// connect to db
mongoose.connect('mongodb://localhost/URLs');

mongoose.connection.once('open',function(){
  console.log('Connection has been made!')
}).on('error',function(error){
  console.log('Connection error:', error);
});
