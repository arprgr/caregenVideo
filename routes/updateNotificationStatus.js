var express = require('express');
var router = express.Router();
var models = require('../server/models/index');


router.post('/', function(req, res) {
    console.log('updating notification status*************');
    console.log(req.body.notificationId);
    
    models.Notifications.find({
    where: {
      id: req.body.notificationId
    }
  }).then(function(Notification) {
    if(Notification){
      Notification.updateAttributes({
        status: 'Acknowledged'
      }).then(function(Message) {
        res.status(200).send('success');
      });
    }
  });
    
    

});

module.exports = router;
