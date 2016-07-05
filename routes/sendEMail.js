var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport();
var path = require('path');
var models = require('../server/models/index');

//Load configs
var nconf = require('nconf');



var connectionString    = path.join(__dirname, 'configEmail.json');

//    console.log('this is the dir name.');
console.log(connectionString);

nconf.use('file', { file: connectionString });
nconf.load();

console.log(nconf.get('emailUser'));
console.log(nconf.get('emailPass'));


router.post('/', function(req, res) {

 console.log("this email id received");
 console.log(req.body.email);

 
    
  
  var transporter = nodemailer.createTransport({
    service: 'hotmail',
        auth: {
            user: nconf.get('emailUser'), // Your email id
            pass: nconf.get('emailPass') // Your password
        }
       });

    var text = 'Welcome to CareGen, Please click on this link to register \n\n' + "http://localhost:3000/Index.html#/?origin=email&emailid=" + req.body.email;

    var mailOptions = {
    from: nconf.get('emailUser'), // sender address
    to: req.body.email, // list of receivers
    subject: 'Welcome to CareGen', // Subject line
    text : text // plain text body
    
    };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);

        // update RIP Table
        models.RIPUsers.find({
        where: {
            emailid: req.body.email
        }
    }).then(function(RIPUsers) {
        if (!RIPUsers) {

            console.log("user not present in RIP needs to be added ");

            models.RIPUsers.create({
                emailid: req.body.email,
                status : 'Initial : Error sending email'
            }).then(function (RIPUsers) {
                console.log("user added to RIPUsers");
            });


        }
        else {
            console.log("user already registered");
            
        }
    })

        res.json({caregen: 'error'});
    }else{
        console.log('Message sent: ' + info.response);

        models.RIPUsers.find({
        where: {
            emailid: req.body.email
        }
    }).then(function(RIPUsers) {
        if (!RIPUsers) {

            console.log("user not present in RIP needs to be added ");

            models.RIPUsers.create({
                emailid: req.body.email,
                status : 'email sent'
            }).then(function (RIPUsers) {
                console.log("user added to RIPUsers");
            });


        }
        else {
            console.log("user already registered");
            
        }
    })


        
        res.json({caregen : info.response});
    };
});


  console.log("done sending email");

});
module.exports = router;
