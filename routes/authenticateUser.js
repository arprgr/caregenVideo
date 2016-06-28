var express = require('express');
var router = express.Router();
var models = require('../server/models/index');


router.post('/', function(req, res) {
    models.users.find({
        where: {
            emailid: req.body.email
        }
    }).then(function(users) {
        console.log('this is what I found!!');
        console.log(users.emailid);
        console.log(users.password);

        if (users.password != req.body.password) {

           console.log('passwords do not match!!');
           res.status(500).send({ error: "boo:(" });
        }
        else {
        console.log('passwords match!!');
        return (res.json(users));
        }
    });
});

module.exports = router;
