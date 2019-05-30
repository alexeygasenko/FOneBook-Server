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

module.exports = router;