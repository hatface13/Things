console.log('Starting warehouse.js');

var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('warehouse');
});

module.exports = router;
