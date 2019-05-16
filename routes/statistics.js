const express = require('express');
const router = express.Router();

const Statistics = require('../models/Statistics');

router.get('/:year', function (req, res) {
  Statistics.findOne({
    year: req.params.year,
  })
    .populate('teams')
    .populate('drivers')
    .then(stats => {
      if (!stats) {
        res.status(404).send('Statistics for this year were not found.');
      } else {
        return res.status(200).send(stats);
      }
    })
});

module.exports = router;