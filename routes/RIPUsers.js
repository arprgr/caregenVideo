var express = require('express');
var router = express.Router();
var models = require('../server/models/index');


/* GET users listing. */
router.get('/', function(req, res, next) {

	models.RIPUsers.findAll({}).then(function(RIPUsers) {
    res.json(RIPUsers);
  });

});

module.exports = router;
