var express = require('express');
var router = express.Router();
var models = require('../server/models/index');

///var fs        = require('fs');
//var path      = require('path');
var Sequelize = require('sequelize');
//var basename  = path.basename(module.filename);
//var env       = process.env.NODE_ENV || 'development';
//var config    = require(__dirname + '\\configSeq.json')[env];
//var config    = require(path.join(__dirname, 'configSeq.json')) [env];

var config = require('config'); 

var dbName = config.get('caregen.dbConfig.database');
var dbUser = config.get('caregen.dbConfig.username');
var dbPass = config.get('caregen.dbConfig.password');
var dbConfig = config.get('caregen.dbConfig');
//var db        = {};

console.log('**************in getsentinvitations');
console.log(config.use_env_variable);
console.log(dbConfig);
console.log(dbUser);

/* GET users listing. */
router.post('/', function(req, res) {

  
    

   if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(dbName, dbUser, dbPass, dbConfig);
 
   
  sequelize.query('SELECT "Invitations"."receiverEmailid" , "Users"."name" FROM "Invitations" left outer join "Users" ON "Invitations"."receiverEmailid" = "Users"."emailid" WHERE "Invitations"."senderEmailid" = ? AND "Invitations"."status" != ?',
    { replacements: [req.body.senderEmailid , 'accepted'], type: sequelize.QueryTypes.SELECT }
).then(function(Users) {
  res.json(Users);
})

}



});

module.exports = router;

