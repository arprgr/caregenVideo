var express = require('express');
var router = express.Router();

var path = require('path');

var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.text({ limit: '1gb' });

var connectionString = require(path.join(__dirname, 'config'));
var models = require('../server/models/index');



router.post('/', urlencodedParser, function(req, res) {
   
      
    var jsonString = JSON.parse(req.body);
    var jsonVid = JSON.parse(jsonString.vid)
    
    
    console.log('from  writeVideoPackager');
    console.log(jsonString.fName);
    console.log(jsonString.selectedNames);
    console.log(jsonString.senderEmailid);
    console.log(jsonVid.publicId);
    console.log(jsonString.videoType);
    
      models.Messages.create({
                vid: jsonVid.publicId,
                senderEmailId: jsonString.senderEmailid,
                receiverEmailId : jsonString.selectedNames,
                messageType: 'video',
                status: 'unread',
                location: 'inbox'
            }).then(function (Message) {
            	console.log('entry created in the new writeVideoPackager for ' + jsonString.vid);
            });

  });


module.exports = router;
