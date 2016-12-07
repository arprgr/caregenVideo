
var express = require('express');
var router = express.Router();
var models = require('../server/models/index');


router.post('/', function(req, res) {

console.log('cancelling invite..')
console.log(req.body.inviteId)    

 models.Invitations.find({
    where: {
      id : req.body.inviteId
    }
  }).then(function(Invitation) {
    if(Invitation){
      Invitation.updateAttributes({
        status: 'Cancelled',
        invitestatus : 'Cancelled'  
          
      }).then(function(Message) {
        res.status(200).send('success');
      });
    }
  });
    
    
});

module.exports = router;


