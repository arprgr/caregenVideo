var express = require('express');
var router = express.Router();
var models = require('../server/models/index');


router.post('/', function(req, res) {
    models.Users.find({
        where: {
            emailid: req.body.email
        }
    }).then(function(Users) {
        console.log('this is what I found!!');
        console.log(Users.emailid);
        console.log(Users.password);

        if (Users.password != req.body.password) {

           console.log('passwords do not match!!');
           res.status(500).send({ error: "boo:(" });
        }
        else {
        console.log('passwords match!!');
        return (res.json(Users));
        }
    });
});

module.exports = router;
