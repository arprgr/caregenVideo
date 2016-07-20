var express = require('express');
var router = express.Router();
var models = require('../server/models/index');


router.post('/', function(req, res) {
    
    models.Users.find({ attributes: ['emailid','name' , 'password'] ,
        where: {
            emailid: req.body.email

        }
    }).then(function(Users) {

        console.log(Users.password) 
        console.log(req.body.password)

        if (Users.password != req.body.password) {

           console.log('passwords do not match!!');
 //          res.status(500).send({ error: "Invalid Password" });
            res.json({status: 500});
        }
        else {
        console.log('valid user!!');    
        return (res.json(Users));
        }
    });
});

module.exports = router;

