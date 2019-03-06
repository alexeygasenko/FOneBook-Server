const express = require('express');
const router = express.Router();

const NewsPreview = require('../models/NewsPreview');

router.get('/', function(req, res) {
  NewsPreview.find({
    date: {
      $gte: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)),
    }
  })
    .then(news => {
      
      return res.status(200).json(news);
    });
});

module.exports = router;