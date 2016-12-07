
var express = require('express');
var router = express.Router();
var models = require('../server/models/index');


router.post('/', function(req, res) {

		models.Invitations.destroy({
		    where: {
		      id : req.body.inviteId  
		    }
		  }).then(function(Invitations) {
		    res.json(Invitations);
		  });
   
});

module.exports = router;


