var express = require('express');
var router = express.Router();
//var nodemailer = require("nodemailer");
//var transporter = nodemailer.createTransport();


var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'My Own Title' });
  console.log(__dirname);
  res.sendFile(path.join(__dirname, '../Client/careGen', 'Index.html'));
});

module.exports = router;
