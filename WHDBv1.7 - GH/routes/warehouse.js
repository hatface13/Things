console.log('Starting warehouse.js');

var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('warehouse',{ title: 'Warehouse' });
});

module.exports = router;
