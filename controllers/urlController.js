const mongoose = require('mongoose');
const url = require('../models/url.js');
const validUrl = require('valid-url');

var shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');


exports.create_url_get = function(req, res, next){
var URL = req.params.url + req.params[0];
if(validUrl.isUri(URL)){
findUrl(URL).then(function(result){
  if(!result){
  var local = 'https://www.' + req.get('host') + "/";
  var shortCode = shortid.generate();
  var shortURL = local + shortCode;
  addToDatabase(URL, shortURL).then(function(result){
     res.json({
       original_url: result.original_url,
       short_url: result.short_url
     })
   })
  }else{
    console.log('There is a duplicate match. Sending match to client...');
    res.json({
      original_url: result.original_url,
      short_url: result.short_url
    })
  }
})

}else{
    res.json({
      error: 'Not a valid url.'
    })
  }
}

exports.get_url = function(req, res, next){
 var local = 'https://www.' + req.get('host') + "/";
 var shortCode = req.params.url;
 var shortURL = local + shortCode;
 console.log(shortURL)
findShortUrl(shortURL).then(function(result){
  if(!result){
     res.json({
      error: 'Sorry, the short url supplied could not be found in the database.'
     })
   }else{
    res.redirect(result.original_url);
   }
 })

}


// Helper Functions
function findShortUrl(shortURL){
  return new Promise(function(resolve,reject){
    url.find({short_url: shortURL}, function(err, savedUrl){
      if(err){reject(err)}
      resolve(savedUrl[0])
    });
  });
}

function findUrl(URL){
  return new Promise(function(resolve,reject){
    url.find({original_url: URL}, function(err, savedUrl){
      if(err){reject(err)}
       resolve(savedUrl[0])
      })
  });
}

function addToDatabase(URL, shortURL){
return new Promise(function(resolve, reject){
  url.create({original_url: URL, short_url: shortURL}, function(err, savedUrl){
      if(err){reject(err)}
      else{
        resolve(savedUrl);
      }
    })
  })
}
