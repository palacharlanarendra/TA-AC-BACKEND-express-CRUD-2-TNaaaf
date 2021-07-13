var express = require('express');
var router = express.Router();
var Blog = require('../models/blogs');
/* GET users listing. */

router.get('/', function (req, res, next) {
  Blog.find({}, (err, blogs) => {
    if (err) return next(err);
    res.render('blogsPage', { blogs: blogs });
  });
});
router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  Blog.findById(id, (err, blog) => {
    if (err) return next(err);
    res.render('singleUser', { blog: blog });
  });
});
router.get('/:id/edit', function (req, res, next) {
  var id = req.params.id;
  Blog.findById(id, (err, blog) => {
    if (err) return next(err);
    res.render('blogNewForm', { blog: blog });
  });
});
router.get('/:id/delete', function (req, res, next) {
  var id = req.params.id;
  Blog.findByIdAndDelete(id, (err, blog) => {
    if (err) return next(err);
    res.redirect('/blog');
  });
});
router.get('/new', function (req, res) {
  res.render('blogsForm');
});
router.post('/', (req, res, next) => {
  Blog.create(req.body, (err, createArticle) => {
    if (err) return next(err);
    res.redirect('/blog');
  });
});
router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Blog.findByIdAndUpdate(id, req.body, (err, updateBlog) => {
    if (err) return next(err);
    res.redirect('/blog/' + id);
  });
});
module.exports = router;
