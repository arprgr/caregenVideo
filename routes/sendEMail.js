var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport();
var path = require('path');
var models = require('../server/models/index');
var config = require('config');



//Load configs
//var nconf = require('nconf');
//var connectionString    = path.join(__dirname, 'configEmail.json');
//console.log('this is the dir name.');
//console.log(connectionString);
//nconf.use('file', { file: connectionString });
//nconf.load();

var emailUser = config.get('caregen.emailConfig.emailUser');
var emailPass = config.get('caregen.emailConfig.emailPass');
var hostURL =   config.get('caregen.serverURL.hostURL');


console.log(emailUser);
console.log(emailPass);


router.post('/', function(req, res) {

 console.log("this email id received");
 console.log(req.body.email);

 
    
  
  var transporter = nodemailer.createTransport({
    service: 'hotmail',
        auth: {
            user: emailUser, // Your email id
            pass: emailPass // Your password
        }
       });

    var text = 'Welcome to CareGen, Please click on this link to register \n\n' +  hostURL + "Index.html#/?origin=email&emailid=" + req.body.email;

    console.log(text);

    var mailOptions = {
    from: emailUser, // sender address
    to: req.body.email, // list of receivers
    subject: 'Welcome to CareGen', // Subject line
    text : text // plain text body
    
    };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);

        // update RIP Table
        models.RIPUsers.find({ attributes: ['emailid', 'status'] ,
        where: {
            emailid: req.body.email
        }
    }).then(function(RIPUsers) {
        if (!RIPUsers) {

            console.log("user not present in RIP needs to be added ");

            models.RIPUsers.create({
                emailid: req.body.email,
                origin : 'self registered',
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

        models.RIPUsers.find({ attributes: ['emailid', 'status'] , 
        where: {
            emailid: req.body.email
        }
    }).then(function(RIPUsers) {
        if (!RIPUsers) {

            console.log("user not present in RIP needs to be added ");

            models.RIPUsers.create({
                emailid: req.body.email,
                origin : 'self registered',
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
