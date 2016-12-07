var express = require('express');
var router = express.Router();
var models = require('../server/models/index');

/* add new users to the user table */
router.post('/', function(req, res) {

    models.Users.find({ attributes: ['emailid'],
        where: {
            emailid: req.body.email
        }
    }).then(function(Users) {
        if (!Users) {
            models.Users.create({
                emailid: req.body.email,
                name: req.body.name,
                password: req.body.password
            }).then(function (Users) {

                /// Need to update the RIP table as well


                  models.RIPUsers.find({ attributes: ['emailid', 'status'] ,
                  where: {
                        emailid: req.body.email
                    }
                        }).then(function(RIPUsers) {
                    if (RIPUsers) {

                        console.log("user added to Users also needs to be updated in RIP");

                        RIPUsers.updateAttributes({
                            status : 'user registered'
                        }).then(function (RIPUsers) {
                            console.log("user updated as registered in RIP");
                        });


                    }
                    else {
                        console.log("user already registered");
                        
                    }
                })



                ///


                res.json(Users);
            });
        }
        else {
            console.log("user already registered");
            res.status(230).send({ error: "user already registered" });

        }
    })

});

module.exports = router;
