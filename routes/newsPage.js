const express = require('express');
const router = express.Router();

const NewsPage = require('../models/NewsPage');

router.get('/:url', function(req, res) {
  NewsPage.findOne({
    url: req.params.url,
  })
    .then(newsPage => {
      if (!newsPage) {
        throw new Error('News with this url was not found');
      }
      return res.status(200).json(newsPage);
    })
    .catch(err => {
      res.status(404).send(err);
    });
});

module.exports = router;