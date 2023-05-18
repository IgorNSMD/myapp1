var express = require('express');
var router = express.Router();
var queryDatabase = require('../config/testmysql.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express MySQL P1' });
});

module.exports = router;
