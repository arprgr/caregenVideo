var express = require('express');
var router = express.Router();
var models = require('../server/models/index');


/* GET users listing. */
router.get('/', function(req, res, next) {

	models.Users.findAll({}).then(function(Users) {
    res.json(Users);
  });

});

module.exports = router;
