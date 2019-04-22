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
      if (err) return res.status(400).send(err);
      if (bookings.length === 0) {
        return res.status(404).send('Bookings were not found');
      } else {
        return res.status(200).send(bookings);
      }
    })
});

router.get('/booking-info/:id', function(req, res) {
  UserBooking.findOne({
    _id: req.params.id,
  })
    .populate('event')
    .exec(function(err, bookingInfo) {
      if (err) return res.status(400).send(err);
      if (!bookingInfo) {
        return res.status(404).send('Booking with this id is not found');
      } else {
        return res.status(200).send(bookingInfo);
      }
    })
});

router.post('/make-a-book/', function(req, res) {
  if (!req.body.hasOwnProperty('eventId') || !req.body.hasOwnProperty('userId')
    || !req.body.hasOwnProperty('tribune') || !req.body.hasOwnProperty('dayOne') 
    || !req.body.hasOwnProperty('dayTwo') || !req.body.hasOwnProperty('dayThree')) {
    return res.status(400).send('Some of the booking information is missing.');   
  }

  BookingEvent.findOne({
    _id: req.body.eventId,
  }).then(event => {
    let isInTribunes = false;
    for (let i = 0; i < event.tribunes.length; ++i) {
      if (event.tribunes[i].name === req.body.tribune) {
        isInTribunes = true;
      }
    }
    if (!isInTribunes) {
      res.status(400).send('This event does not contain the following tribune');

    } else {
      const newUserBooking = new UserBooking({
        user: req.body.userId,
        event: req.body.eventId,
        tribune: req.body.tribune,
        dayOne: req.body.dayOne,
        dayTwo: req.body.dayTwo,
        dayThree: req.body.dayThree
      });
    
      newUserBooking.save()
        .then(userBooking => {
          res.status(200).send(userBooking);
        });
    }
  });
});

module.exports = router;