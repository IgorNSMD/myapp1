var express = require('express');
var Task = require('../models/task')

var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const task = await Task.findAll({
      where: { taskName: "tarea 2" }
   })
    console.log(task)
    res.render('index', { title: 'Express MySQL P17' });
  } catch (error) {
    console.log(error)
  }

});

module.exports = router;
