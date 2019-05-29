const express = require('express');
const router = express.Router();

const CommunityPage = require('../models/CommunityPage');

router.get('/:url', function (req, res) {
  CommunityPage.findOne({
    url: req.params.url,
  })
    .populate('author')
    .then(post => {
      return res.status(200).send(post);
    });
});

module.exports = router;