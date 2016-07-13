var express = require('express');
var router = express.Router();
var models = require('../server/models/index');

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '\\configSeq.json')[env];
var db        = {};


/* GET users listing. */
router.post('/', function(req, res) {

   if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
 
   console.log(config.database);
   console.log(config.username);
   console.log(config.password);
   console.log(req.body.emailid);
    
  sequelize.query('SELECT "Invitations"."senderEmailid" , "Users"."name" FROM "Invitations" inner join "Users" ON "Invitations"."senderEmailid" = "Users"."emailid" AND "Invitations"."receiverEmailid" = ? AND "Invitations"."status" != ?', 
    { replacements: [req.body.senderEmailid, 'accepted'], type: sequelize.QueryTypes.SELECT }
).then(function(Users) {
  res.json(Users);
})

}



});

module.exports = router;

