const express = require('express');
const router = express.Router();

const AutoPage = require('../models/NewsPage');

router.get('/article/:url', function (req, res) {
  AutoPage.findOne({
    url: req.params.url,
  })
    .populate('author')
    .then(autoPage => {
      return res.status(200).send(autoPage);
    });
});

module.exports = router;