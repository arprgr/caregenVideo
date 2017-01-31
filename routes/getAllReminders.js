var express = require('express');
var router = express.Router();
var models = require('../server/models/index');

//var fs        = require('fs');
//var path      = require('path');
//var basename  = path.basename(module.filename);
//var env       = process.env.NODE_ENV || 'development';
//var config    = require(__dirname + '\\configSeq.json')[env];
//var db        = {};

//var config    = require(path.join(__dirname, 'configSeq.json')) [env];
var Sequelize = require('sequelize');


  var config = require('config'); 

  var dbName = config.get('caregen.dbConfig.database');
  var dbUser = config.get('caregen.dbConfig.username');
  var dbPass = config.get('caregen.dbConfig.password');
  var dbConfig = config.get('caregen.dbConfig');

//console.log(config.use_env_variable);
console.log(dbConfig);

/* GET users listing. */

router.post('/', function(req, res) {

console.log('@@**@@**in get All Reminders for: ' + req.body.email)

   if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(dbName, dbUser, dbPass, dbConfig);
   
 sequelize.query('SELECT "Reminders"."id", "Reminders"."senderEmailId" ,"Reminders"."senderName" , "Reminders"."receiverEmailId", "Reminders"."status", "Reminders"."location","Reminders"."createdAt","Reminders"."messageType","Reminders"."deliverAt" ,"Videos"."vMessageURL", "Videos"."vMessagePublicId", "Videos"."vMessageThumb" FROM "Reminders" left outer join "Videos" ON "Reminders"."vid" = "Videos"."vid" WHERE "Reminders"."lastDeliveredAt" != ? and "Reminders"."receiverEmailId" = ?', 
    { replacements: ['Never' , req.body.email], type: sequelize.QueryTypes.SELECT }
).then(function(VMessages) {
  res.json(VMessages);
})


}



});

module.exports = router;

