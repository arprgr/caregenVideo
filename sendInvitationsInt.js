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

  models.Connections.find({ attributes: ['id'] ,
        where: {
            primaryEmailid : req.body.senderEmailid,
            connectedToEmailid : req.body.receiverEmailid
        }
    }).then(function(Connections) {   
        if (Connections != null ) {
        console.log('no need to go further connection already exists');
        
        res.status(230).end();  return;
        }
    });
  

    models.Invitations.find({ attributes: ['id'] ,
        where: {
            senderEmailid : req.body.senderEmailid,
            receiverEmailid : req.body.receiverEmailid
        }
    }).then(function(Invitations) {   
        if (Invitations != null) {
        console.log('you have already invited this user');
        
        res.status(240).end();  return;
        }
    });

  models.Invitations.find({ attributes: ['id'] ,
        where: {
            senderEmailid : req.body.receiverEmailid,
            receiverEmailid : req.body.senderEmailid
        }
    }).then(function(Invitations) {   
        if (Invitations != null) {
        console.log('Outstanding invitation already exists');
        
        res.status(250).end();  return;
        }
    }); 
    
  
 var transporter = nodemailer.createTransport({
    service: 'hotmail',
        auth: {
            user: nconf.get('emailUser'), // Your email id
            pass: nconf.get('emailPass') // Your password
        }
       });

    var text = req.body.senderEmailid + ' wants to connect with you, please click on the below link to respond \n\n' + "http://localhost:3000/Index.html#/?origin=email&emailid=" + req.body.senderEmailid;

    var mailOptions = {
    from: nconf.get('emailUser'), // sender address
    to: req.body.email, // list of receivers
    subject: 'Welcome to CareGen', // Subject line
    text : text // plain text body
    
    };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        
        models.Invitations.create({
                senderEmailid: req.body.senderEmailid,
                receiverEmailid: req.body.receiverEmailid,
                message : req.body.receiverEmailid,
                status : 'Invited : error sending email'
            }).then(function (RIPUsers) {
                console.log("Inivation added but email not sent");
            });

        res.json({caregen: ' invite added but email error'});

    } 

    else { 

        models.Invitations.create({
                senderEmailid: req.body.senderEmailid,
                receiverEmailid: req.body.receiverEmailid,
                message : req.body.receiverEmailid,
                status : 'Invited : email sent'
            }).then(function (RIPUsers) {
                console.log("Inivation added email sent");
            });

        console.log('Message sent: ' + info.response);
        res.json({caregen: info.response})

    };
});


  console.log("done sending email");

});
module.exports = router;
