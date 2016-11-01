
var express = require('express');
var router = express.Router();
var models = require('../server/models/index');


router.post('/', function(req, res) {

 models.Invitations.find({
    where: {
      senderEmailid : req.body.senderEmailid,
      receiverEmailid : req.body.receiverEmailid
    }
  }).then(function(Invitation) {
    if(Invitation){
      Invitation.updateAttributes({
        status: 'rejected',
        invitestatus : 'rejected'  
          
      }).then(function(Message) {
        res.status(200).send('success');
      });
    }
  });
    
    
});

module.exports = router;


