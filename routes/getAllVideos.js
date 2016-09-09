var express = require('express');
var router = express.Router();

var path = require('path');

var express = require('express');
var router = express.Router();
var pg = require('pg');
var cloudinary = require ('cloudinary');

var connectionString = require(path.join(__dirname, 'config'));

cloudinary.config({ cloud_name: 'simplifyit', api_key: '951594481582174', api_secret: 'Wh-6ElxK0yekJ6RHR_DpNFd1lIY' });

//var models = require('../server/models/index');


router.get('/', function(req, res) {

    
 var results = [];

  console.log('getting all videos');
  
            
var fs = require('fs');

var path = __dirname + '\\uploads' ;

console.log(path);

var files = fs.readdirSync(path);    
    
 console.log(files);
    
    for (var i in files) {
        var ref = path;
        var vFile = ref + '\\'+ files[i];
        console.log('Model Loaded: ' + vFile);
        
        results.push({i : files[i]});
        
    }
 
    console.log('displaying files');
    console.log(results);

    res.contentType('application/json');
    res.send(JSON.stringify(files));
   
  
  });


module.exports = router;
