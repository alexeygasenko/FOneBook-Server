const express = require('express');
const router = express.Router();

const Comment = require('../models/Comment');

router.get('/:url', function(req, res) {
  Comment.find({
    url: req.params.url,
  })
    .populate('author')
    .then(comments => {
      res.status(200).send(comments);
    });
});

router.post('/', function(req, res) {
  const newComment = new Comment({
    author: req.body.userId,
    text: req.body.text,
    url: req.body.url,
    rating: 0,
    date: Date.now()
  });

  newComment.save()
    .then(() => {
      Comment.find({
        url: req.body.url,
      })
        .populate('author')
        .then(comments => {
          res.status(200).send(comments);
        });
    })
});

module.exports = router;