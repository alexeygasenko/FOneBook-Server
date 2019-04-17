const express = require('express');
const router = express.Router();

const NewsPage = require('../models/NewsPage');
const NewsFeed = require('../models/NewsFeed');

router.get('/:url', function(req, res) {
  NewsPage.findOne({
    url: req.params.url,
  })
    .then(newsPage => {
      NewsFeed.find({
        url: {
          $ne: req.params.url,
        }
      })
        .then(otherNews => {
          if (!newsPage) {
            throw new Error('News with this url was not found.');
          } else {
              return res.status(200).send({
                newsPage: newsPage,
                otherNews: otherNews,
              });
            }
          }
        )
        .catch(err => {
          res.status(404).send(err.toString());
        });
    })
});

module.exports = router;