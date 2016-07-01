var express = require('express');
var router = express.Router();
var models = require('../server/models/index');

/* add new users to the user table */
router.post('/', function(req, res) {
models.Users.create({
        name: req.body.name,
        emailid: req.body.email,
        password: req.body.password
    }).then(function(Users) {
        res.json(Users);
    });
});

module.exports = router;
