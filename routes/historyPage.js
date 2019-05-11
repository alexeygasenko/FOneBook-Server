const express = require('express');
const router = express.Router();

const HistoryPage = require('../models/NewsPage');

router.get('/article/:url', function (req, res) {
  HistoryPage.findOne({
    url: req.params.url,
  })
    .populate('author')
    .then(historyPage => {
      return res.status(200).send(historyPage);
    });
});

module.exports = router;