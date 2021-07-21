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
// router.get('/authors', function (req, res, next) {
//   Book.find({})
//     .populate('authorId')
//     .exec((err, books) => {
//       console.log(books);
//       res.render('authorsList', { books: books });
//     });
// });
router.get('/new', function (req, res, next) {
  res.render('newEntry');
});

router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  Book.findById(id)
    .populate('authorId')
    .exec((err, books) => {
      console.log(books);
      res.render('singleBook', { books: books });
    });
});

router.get('/:id/delete', function (req, res, next) {
  var id = req.params.id;
  Book.findByIdAndRemove(id, (err, books) => {
    console.log(books);
    Author.findByIdAndUpdate(
      books.authorId,
      { $pull: { booksId: books._id } },
      (err, author) => {
        res.redirect('/books/');
      }
    );
  });
});
router.post('/', function (req, res, next) {
  Author.findOne({ author_email: req.body.author_email }, (err, author) => {
    if (err) return next(err);
    if (!author) {
      Author.create(req.body, (err, author) => {
        req.body.authorId = author._id;
        Book.create(req.body, (err, book) => {
          console.log(typeof book.id, typeof book._id);
          if (err) return next(err);
          Author.findByIdAndUpdate(
            author._id,
            { $push: { booksId: book.id } },
            { new: true },
            (err, updatedAuthor) => {
              console.log(updatedAuthor);
              if (err) return next(err);
              res.redirect('/books');
            }
          );
        });
      });
    } else {
      req.body.authorId = author._id;
      Book.create(req.body, (err, book) => {
        console.log(typeof book.id, typeof book._id);
        if (err) return next(err);
        Author.findByIdAndUpdate(
          author._id,
          { $push: { booksId: book.id } },
          { new: true },
          (err, updatedAuthor) => {
            console.log(updatedAuthor);
            if (err) return next(err);
            res.redirect('/books');
          }
        );
      });
    }
  });
  // Author.create(req.body, (err, author) => {
  //   if (err) return next(err);
  //   req.body.authorId = author._id;
  //   Book.create(req.body, (err, book) => {
  //     console.log(typeof book.id, typeof book._id);
  //     if (err) return next(err);
  //     Author.findByIdAndUpdate(
  //       author._id,
  //       { $push: { booksId: book.id } },
  //       { new: true },
  //       (err, updatedAuthor) => {
  //         console.log(updatedAuthor);
  //         if (err) return next(err);
  //         res.redirect('/books');
  //       }
  //     );
  //   });
  // });
});
module.exports = router;
