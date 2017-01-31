var express = require('express');
var router = express.Router();
var models = require('../server/models/index');


router.post('/', function(req, res) {
    
    console.log('Getting all notifications');
    console.log(req.body.email);

        
    models.Notifications.findAll({ attributes: ['id', 'senderEmailId', 'senderName', 'receiverEmailId', 'receiverName', 'notificationType', 'notificationMeta1', 'notificationMeta2', 'notificationMeta3', 'notificationMeta4', 'status', 'createdAt', 'updatedAt', 'deliverAt'],
        where: {
          receiverEmailId: req.body.email,
          status : 'Not Acknowledged'    
        }
    }).then(function(Notifications) {
        if (!Notifications) {
          console.log("Zero Notifications!");
          res.status(220).send('failed');
        }
        else {   
        
        models.Notifications.update (
            { status: 'Delivered' },
            { where: {receiverEmailId: req.body.email, status: 'Not Acknowledged'}}         
        ).then(function(affectedRows){
            
            console.log('Updated ' + affectedRows + ' rows');
        });
            
          res.json(Notifications);  
       }
    }); 
    
});

module.exports = router;
