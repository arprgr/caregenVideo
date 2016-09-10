var express = require('express');
var router = express.Router();
var models = require('../server/models/index');


router.post('/', function(req, res) {
    
    console.log(req.body.mesgId);
    
    models.Messages.find({
    where: {
      id: req.body.mesgId
    }
  }).then(function(Message) {
    if(Message){
      Message.updateAttributes({
        status: 'read'
      }).then(function(Message) {
        res.status(200).send('success');
      });
    }
  });
    
    

});

module.exports = router;
