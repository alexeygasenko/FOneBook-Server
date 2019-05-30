const express = require('express');
const router = express.Router();

const CommunityFeed = require('../models/CommunityPage');

router.get('/', function (req, res) {
  CommunityFeed.find()
    .then(communityFeed => {
      return res.status(200).send(communityFeed);
    });
});

module.exports = router;