
var express = require('express');
var router = express.Router();
var models = require('../server/models/index');


router.post('/', function(req, res) {

		models.Invitations.destroy({
		    where: {
		      senderEmailid : req.body.senderEmailid,
		      receiverEmailid : req.body.receiverEmailid
		    }
		  }).then(function(Invitations) {
		    res.json(Invitations);
		  });
   
});

module.exports = router;


