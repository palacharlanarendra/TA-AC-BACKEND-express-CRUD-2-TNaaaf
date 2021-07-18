var express = require('express');
var router = express.Router();
var Book = require('../models/books');
var Author = require('../models/authors');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
