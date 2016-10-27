var express = require('express');
var router = express.Router();
var models = require('../server/models/index');

/* add new users to the user table */
router.post('/', function(req, res) {

			models.Connections.create({
                primaryEmailid: req.body.receiverEmailid,
                connectedToEmailid: req.body.senderEmailid,
                 Duplicate: 'Original'
            }).then(function (Users) {

            	console.log('first entry created');
            });	

           models.Connections.create({
                primaryEmailid: req.body.senderEmailid,
                connectedToEmailid: req.body.receiverEmailid,
                Duplicate: 'Duplicate'
            }).then(function (Users) {

			   	console.log('in create connection');
			    console.log(req.body.senderEmailid);
			    console.log(req.body.receiverEmailid);
			   
                models.Invitations.find({
					    where: {
					      senderEmailid : req.body.senderEmailid,
					      receiverEmailid : req.body.receiverEmailid
					    }
					  }).then(function(Invitations) {
					    if(Invitations){
					      Invitations.updateAttributes({
					        status: 'accepted'
					      }).then(function(Invitations) {
					        console.log('connection added,invite updated to accepted');
					      });
					    }
					  });
                res.status(200).send('success');
            });
});

module.exports = router;
