var express = require('express');
var router = express.Router();
var models = require('../server/models/index');

/* add new users to the user table */
router.post('/', function(req, res) {
    console.log('handing fb users');
    console.log(req.body);
    models.fbusersdata.find({ attributes: ['fbid'],
        where: {
            fbid: req.body.fbid
        }
    }).then(function(fbusersdata) {
        if (!fbusersdata) {
            models.fbusersdata.create({
                fbid: req.body.fbid,
                fbemailid: req.body.email,
                fbname: req.body.name,
                profilepic: req.body.userphoto
            }).then(function (fbusersdata) {
                console.log('FB User added, check if user present in Users table');
                
                models.Users.find({ attributes: ['emailid'],
                        where: {
                            emailid: req.body.email
                        }
                    }).then(function(Users) {
                        if (!Users) {
                            models.Users.create({
                                emailid: req.body.email,
                                name: req.body.name,
                                password: 'facebook',
                                fbid: req.body.fbid,
                                usertype: 'facebook'
                            }).then(function (Users) {

                                console.log('new facebook user creation completed');
                                res.status(200).send({ success: "new facebook user creation completed" });
                            });
                        }
                        else {
                            console.log("This facebook user is arlready registered with LC");
                            Users.updateAttributes ({
                                fbid : req.body.fbid,
                                usertype : 'facebook',
                                password: 'facebook'
                            }).then(function(Users) {  
                            res.status(230).send({ error: "user already registered proceed with login" });
                            });    
                        }
                    });
                             
            });
        }
        else {
            console.log("FB Users Data already present, just update");

            fbusersdata.updateAttributes({
                fbid: req.body.fbid,
                fbemailid: req.body.email,
                fbname: req.body.name,
                profilepic: req.body.userphoto
              }).then(function(fbusersdata) {
                res.status(200).send({ updated: "FB Users data already present data updated, continue" });
              });


            

        }
    })

});

module.exports = router;