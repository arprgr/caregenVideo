var express = require('express');
var router = express.Router();
var models = require('../server/models/index');


router.post('/', function(req, res) {
    console.log('dismissing notification*************');
    console.log(req.body.notificationId);
    
    models.Notifications.find({
    where: {
      id: req.body.notificationId
    }
  }).then(function(Notification) {
    if(Notification){
      Notification.updateAttributes({
        status: 'Dismissed'
      }).then(function(Message) {
        res.status(200).send('success');
      });
    }
  });
    
    

});

module.exports = router;
