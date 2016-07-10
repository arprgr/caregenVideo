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
   console.log(config);
    
	sequelize.query('SELECT "Connections"."connectedToEmailid" , "Users"."name" FROM "Connections" inner join "Users" ON "Connections"."primaryEmailid" = "Users"."emailid" AND "Connections"."primaryEmailid" = ?', 
    { replacements: [req.body.email], type: sequelize.QueryTypes.SELECT }
).then(function(Users) {
  res.json(Users);
})

}



});

module.exports = router;

