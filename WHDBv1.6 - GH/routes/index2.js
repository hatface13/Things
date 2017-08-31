console.log('Starting index2.js');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index2', { title: 'WHDB' });
});

module.exports = router;
