var express = require('express');
var router = express.Router();
var models = require('../server/models/index');


router.post('/', function(req, res) {


    models.Users.find({
        where: {
          emailid: req.body.email
        }
    }).then(function(Users) {
        if (!Users) {
          console.log("not found");
          res.status(220).send('failed');
        }
        else {
            if (Users.name != "RIP") {
                    console.log('this is what I found!!');
                    console.log(Users.name);
                res.status(200).send('success');
            } else {

                console.log("not found");
                res.status(230).send({ error: "user not registered" });
            }
       }
    });
});

module.exports = router;
