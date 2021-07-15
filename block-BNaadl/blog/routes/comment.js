var express = require('express');
var router = express.Router();
var Comment = require('../models/comments');
/* GET home page. */
router.get('/:id/edit', function (req, res, next) {
  var id = req.params.id;
  Comment.findById(id, (err, comment) => {
    if (err) return next(err);
    res.render('commentNewForm', { comment: comment });
  });
});
router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, (err, updatedComment) => {
    if (err) return next(err);
    res.redirect('/blog/' + updatedComment.blogId);
  });
});
router.get('/:id/delete', function (req, res, next) {
  var id = req.params.id;
  Comment.findByIdAndRemove(id, (err, comment) => {
    if (err) return next(err);
    res.redirect('/blog/' + comment.blogId);
  });
});
router.get('/:id/likes', (req, res, next) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, comment) => {
    if (err) return next(err);
    res.redirect('/blog/' + comment.blogId);
  });
});
router.get('/:id/dislikes', (req, res, next) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, { $inc: { dislikes: 1 } }, (err, comment) => {
    if (err) return next(err);
    res.redirect('/blog/' + comment.blogId);
  });
});
module.exports = router;
