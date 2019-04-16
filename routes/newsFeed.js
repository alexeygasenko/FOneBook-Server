const express = require('express');
const router = express.Router();

const NewsFeed = require('../models/NewsFeed');

router.get('/', function(req, res) {
  NewsFeed.find({
    date: {
      $gte: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)),
    }
  })
    .then(newsFeed => {
      return res.status(200).send(newsFeed);
    });
});

module.exports = router;