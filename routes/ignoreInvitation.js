
var express = require('express');
var router = express.Router();
var models = require('../server/models/index');


router.post('/', function(req, res) {

		models.Invitations.destroy({
		    where: {
		      senderEmailid : 'gregory.pillai@gmail.com',
		      receiverEmailid : 'bridget.pillai@gmail.com'
		    }
		  }).then(function(Invitations) {
		    res.json(Invitations);
		  });
   
});

module.exports = router;


