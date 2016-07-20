var express = require('express');
var router = express.Router();
var models = require('../server/models/index');

//var fs        = require('fs');
//var path      = require('path');
var Sequelize = require('sequelize');
//var basename  = path.basename(module.filename);
//var env       = process.env.NODE_ENV || 'development';
//var config    = require(__dirname + '\\configSeq.json')[env];
//var config    = require(path.join(__dirname, 'configSeq.json')) [env];

//var db        = {};

var config = require('config'); 

var dbName = config.get('caregen.dbConfig.database');
var dbUser = config.get('caregen.dbConfig.username');
var dbPass = config.get('caregen.dbConfig.password');
var dbConfig = config.get('caregen.dbConfig');

/* GET users listing. */
router.post('/', function(req, res) {

   if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(dbName, dbUser, dbPass, dbConfig);
 
   console.log(dbName);
   console.log(dbUser);
   console.log(dbPass);
   console.log(dbConfig);
    
	sequelize.query('SELECT "Connections"."connectedToEmailid" , "Users"."name" FROM "Connections" inner join "Users" ON "Connections"."connectedToEmailid" = "Users"."emailid" AND "Connections"."primaryEmailid" = ?', 
    { replacements: [req.body.senderEmailid], type: sequelize.QueryTypes.SELECT }
).then(function(Users) {
  res.json(Users);
})

}



});

module.exports = router;

