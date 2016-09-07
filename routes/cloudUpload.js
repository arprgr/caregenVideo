var express = require('express');
var router = express.Router();

var path = require('path');

var express = require('express');
var router = express.Router();
var pg = require('pg');
var cloudinary = require ('cloudinary');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.text({ limit: '1gb' });

var connectionString = require(path.join(__dirname, 'config'));
var models = require('../server/models/index');


cloudinary.config({ cloud_name: 'simplifyit', api_key: '951594481582174', api_secret: 'Wh-6ElxK0yekJ6RHR_DpNFd1lIY' });

//var models = require('../server/models/index');


router.post('/', urlencodedParser, function(req, res) {
   
    var filePathBase = __dirname + '\\uploads' + '\\'
    
    var jsonString = JSON.parse(req.body);
    var nameArr = jsonString.selectedNames.split(',');
    
    
    
    console.log(jsonString.fName);
    console.log(jsonString.selectedNames);
    console.log(jsonString.senderEmailid);
    var fName = filePathBase + jsonString.fName ;
   
       cloudinary.uploader.upload(fName, 
        function(result) {           
            
            var senderEmailid =  jsonString.senderEmailid;
            var vURL =  result.secure_url;
            var publicId = result.public_id;
           
            console.log(result); 
            console.log(result.secure_url);
            console.log(result.public_id);
            
            
           nameArr.forEach(function(value){
                
           models.Messages.create({
                senderEmailId: senderEmailid,
                receiverEmailId : value,
                messageType: 'video',
                vMessageURL: vURL,
                vMessagePublicId: publicId,
                status: 'unread',
                location: 'inbox'
            }).then(function (Message) {
            	console.log('entry created for ' + value);
            });
                  
           });
       
       
           return res.json({'Result': 'success'});
       
       }, 
        { resource_type: "video" });
    

  });


module.exports = router;
