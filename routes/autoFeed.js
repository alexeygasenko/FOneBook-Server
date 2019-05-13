const express = require('express');
const router = express.Router();

const AutoFeed = require('../models/NewsPage');

router.get('/:type', function (req, res) {
  AutoFeed.find({
    type: req.params.type,
  })
    .then(autoFeed => {
      return res.status(200).send(autoFeed);
    });
});

module.exports = router;