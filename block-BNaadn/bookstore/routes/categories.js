var express = require('express');
var router = express.Router();
var Book = require('../models/books');
var Author = require('../models/authors');
/* GET home page. */
router.get('/motivation', function (req, res, next) {
  Book.find({})
    .populate('authorId')
    .exec((err, books) => {
      var some = books.filter((book) => {
        if (book.category.includes('motivation')) {
          return book;
        }
      });
      res.render('motivation', { book: some });
    });
});
router.get('/fiction', function (req, res, next) {
  Book.find({})
    .populate('authorId')
    .exec((err, books) => {
      var some = books.filter((book) => {
        if (book.category.includes('fiction')) {
          return book;
        }
      });
      res.render('fiction', { book: some });
    });
});

module.exports = router;
