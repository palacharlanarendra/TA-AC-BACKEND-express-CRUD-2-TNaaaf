var express = require('express');
var router = express.Router();
var Book = require('../models/books');
var Author = require('../models/authors');
/* GET users listing. */
router.get('/', function (req, res, next) {
  Book.find({}, (err, books) => {
    res.render('books', { books: books });
  });
});
router.get('/new', function (req, res, next) {
  res.render('newEntry');
});
router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  Book.findById(id)
    .populate('comments')
    .exec((err, books) => {
      res.render('singleBook', { books: books });
    });
});
router.post('/', function (req, res, next) {
  console.log(`idNumber- ${id}`);
  Author.create(req.body, (err, author) => {
    if (err) return next(err);
    req.body.authorId = author._id;
    Book.create(req.body, (err, book) => {
      console.log(req.body, book._id);
      if (err) return next(err);
      var bookId = book._id;
      Author.findByIdAndUpdate(
        bookId,
        { $push: { booksId: bookId } },
        (err, updatedAuthor) => {
          console.log(updatedAuthor);
          if (err) return next(err);
          res.redirect('/books');
        }
      );
    });
  });
});
module.exports = router;
