var express = require('express');
var router = express.Router();
var Book = require('../models/books');
var Author = require('../models/authors');
/* GET home page. */

router.get('/', function (req, res, next) {
  // Book.find({})
  //   .populate('authorId')
  //   .exec((err, books) => {
  //     console.log(books);
  //     res.render('authorsList', { books: books });
  //   });
  Author.find({}).exec((err, authors) => {
    res.render('authorsList', { authors: authors });
  });
});

router.get('/:id', function (req, res, next) {
  Author.findById(req.params.id)
    .populate('booksId')
    .exec((err, author) => {
      // res.json(author);
      // var filterBooks = books.filter((elem) => {
      //   if (elem.id == req.params.id) {
      //     return elem;
      //   }
      // });
      // var email = filterBooks[0].authorId.author_email;
      res.render('singleAuthor', { author: author });
      // res.json(books);
      // Author.find({})
      //   .populate('booksId')
      //   .exec((err, authors) => {
      //     var some = authors.filter((elem) => {
      //       if (elem.author_email == email) {
      //         return elem;
      //       }
      //     });
      //     res.render('singleAuthor', { authors: some });
      //   });
    });
});
module.exports = router;
