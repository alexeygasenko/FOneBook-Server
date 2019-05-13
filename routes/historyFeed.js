const express = require('express');
const router = express.Router();

const HistoryFeed = require('../models/NewsPage');

router.get('/:type', function (req, res) {
  HistoryFeed.find({
    type: req.params.type,
  })
    .then(historyFeed => {
      return res.status(200).send(historyFeed);
    });
});

module.exports = router;