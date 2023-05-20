var express = require('express');
var Task = require('../models/task')

var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const task = await Task.findAll({})
  console.log(task)
  res.render('index', { title: 'Express MySQL P6' });
});

module.exports = router;
