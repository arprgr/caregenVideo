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

   
 var transporter = nodemailer.createTransport({
    service: 'hotmail',
        auth: {
            user: nconf.get('emailUser'), // Your email id
            pass: nconf.get('emailPass') // Your password
        }
       });

    var text = 'You have an invitation to be part of the CareGen Family. Please click on the below link to register and join \n\n' + "https://shielded-refuge-67132.herokuapp.com/Index.html#/?origin=email&emailid=" + req.body.email;

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
        models.RIPUsers.find({ attributes: ['emailid', 'status'] ,
        where: {
            emailid: req.body.receiverEmailid
        }
    }).then(function(RIPUsers) {
        if (!RIPUsers) {

            console.log("user not present in RIP needs to be added ");

            models.Invitations.create({
                senderEmailid: req.body.senderEmailid,
                receiverEmailid: req.body.receiverEmailid,
                message : req.body.receiverEmailid,
                status : 'Initial : Error sending email'
            }).then(function (RIPUsers) {
                console.log("Invitations added! - but email not sent");
            });

            models.RIPUsers.create({
                emailid: req.body.email,
                origin : 'invited',
                status : 'Initial : Error sending email'
            }).then(function (RIPUsers) {
                console.log("user added to RIPUsers");
            });            

        }
        else {
            console.log("User already on the way to being registered, just create invitation");

             models.Invitations.create({
                senderEmailid: req.body.senderEmailid,
                receiverEmailid: req.body.receiverEmailid,
                message : req.body.receiverEmailid,
                status : 'Invited : Error sending email'
            }).then(function (RIPUsers) {
                console.log("Invitations added! - but email not sent");
            });
            
        }
    })

        res.json({caregen: 'error'});
    }else{
        console.log('Message sent: ' + info.response);

        models.RIPUsers.find({ attributes: ['emailid', 'status'] , 
        where: {
            emailid: req.body.receiverEmailid
        }
    }).then(function(RIPUsers) {
        if (!RIPUsers) {

            console.log("user not present in RIP needs to be added ");

            models.RIPUsers.create({
                emailid: req.body.email,
                origin : 'invited' ,
                status : 'email sent'
            }).then(function (RIPUsers) {
                console.log("user added to RIPUsers");
            });

             models.Invitations.create({
                senderEmailid: req.body.senderEmailid,
                receiverEmailid: req.body.receiverEmailid,
                message : req.body.receiverEmailid,
                status : 'Invited : email sent'
            }).then(function (RIPUsers) {
                console.log("Email sent invitations added");
            });

        }
        else {
            console.log("User already on the way to being registered, just create invitation");

             models.Invitations.create({
                senderEmailid: req.body.senderEmailid,
                receiverEmailid: req.body.receiverEmailid,
                message : req.body.receiverEmailid,
                status : 'Invited : email sent'
            }).then(function (RIPUsers) {
                console.log("Email sent invitations added");
            });
            
        }
    })


        
        res.json({caregen : info.response});
    };
});


  console.log("done sending email");

});
module.exports = router;
