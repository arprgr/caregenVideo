var express = require('express');
var router = express.Router();
var models = require('../server/models/index');

/* add new users to the user table */
router.post('/', function(req, res) {

            models.Connections.create({
                primaryEmailid: req.body.primaryEmail,
                primaryEmailid: req.body.connectedToEmail,
            }).then(function (Users) {

                res.status(200).send('success');
            });       

});

module.exports = router;
