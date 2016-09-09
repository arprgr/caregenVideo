var express = require('express');
var router = express.Router();
var models = require('../server/models/index');


router.post('/', function(req, res) {
    
    console.log('getting all messages');
    console.log(req.body.email);

    models.Messages.findAll({ attributes: ['senderEmailId', 'vMessageURL', 'vMessagePublicId', 'status', 'location', 'createdAt', 'vMessageThumb'],
        where: {
          receiverEmailId: req.body.email
        }
    }).then(function(Messages) {
        if (!Messages) {
          console.log("Zero Messages!");
          res.status(220).send('failed');
        }
        else {
            
          res.json(Messages)  
       }
    });
});

module.exports = router;
