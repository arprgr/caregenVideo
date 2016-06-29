var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport();
var path = require('path');
var models = require('../server/models/index');

//Load configs
var nconf = require('nconf');



var connectionString = path.join('./', 'config.jason');

//    console.log('this is the dir name.');
console.log(connectionString);

nconf.use('file', { file: connectionString });
nconf.load();

console.log(nconf.get('emailUser'));
console.log(nconf.get('emailPass'));


router.get('/:emailid', function(req, res, next) {

 console.log("this email id received");
 console.log(req.params.emailid);

  // First store the email id in the database as an inprogress user

  models.Users.create({
        name: "RIP",
        emailid: req.params.emailid,
        password: "Blank"
    }).then(function(Users) {
        //res.json(Users);
    });


  var transporter = nodemailer.createTransport({
    service: 'hotmail',
        auth: {
            user: nconf.get('emailUser'), // Your email id
            pass: nconf.get('emailPass') // Your password
        }
       });

    var text = 'Hello world from \n\n' + "http://localhost:3000/Home.html";

    var mailOptions = {
    from: nconf.get('emailUser'), // sender address
    to: req.params.emailid, // list of receivers
    subject: 'Test from nodeJS', // Subject line
    text : text // plain text body
    // html: '<b>Hello world ?</b>' // You can choose to send an HTML body instead
    };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({caregen: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({caregen : info.response});
    };
});


  console.log("done sending email");

});
module.exports = router;
