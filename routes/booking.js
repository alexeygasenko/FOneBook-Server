const express = require('express');
const router = express.Router();

const UserBooking = require('../models/UserBooking');
const BookingEvent = require('../models/BookingEvent');

router.get('/events', function(req, res) {
  BookingEvent.find()
    .then(events => {
      return res.status(200).send(events);
    });
});

router.get('/:id', function(req, res) {
  UserBooking.find({
    user: req.params.id
  })
    .populate('user')
    .populate('event')
    .exec(function(err, bookings) {
      return res.status(200).send(bookings);
    })
})

module.exports = router;