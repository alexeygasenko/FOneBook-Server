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
    });
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

  if (!req.body.dayOne && !req.body.dayTwo && !req.body.dayThree) {
    return res.status(400).send('You must book a seat for at lest one day.');
  }

  BookingEvent.findOne({
    _id: req.body.eventId,
  }).then(event => {
    let isInTribunes = false;
    let tribuneNumber = 0;
    
    for (let i = 0; i < event.tribunes.length; ++i) {
      if (event.tribunes[i].name === req.body.tribune) {
        isInTribunes = true;
        tribuneNumber = i;
      }
    }

    if (!isInTribunes) {
      return res.status(400).send('This event does not contain the following tribune');
    }

    if (req.body.dayOne && event.tribunes[tribuneNumber].dayOne.seats <= 0) {
      return res.status(400).send('Seats for day one are all busy.');
    } else if (req.body.dayTwo && event.tribunes[tribuneNumber].dayTwo.seats <= 0) {
      return res.status(400).send('Seats for day two are all busy.');
    } else if (req.body.dayThree && event.tribunes[tribuneNumber].dayThree.seats <= 0) {
      return res.status(400).send('Seats for day three are all busy.');
    }

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
        return res.status(201).send(userBooking);
      });

    if (req.body.dayOne) {
      BookingEvent.updateOne(
        { _id: req.body.eventId,
          'tribunes.name': req.body.tribune,
        },
        {
          $set: {
            'tribunes.$.dayOne.seats': event.tribunes[tribuneNumber].dayOne.seats - 1,
          }
        }, function(err, bookingEvent) {
          console.log(bookingEvent);
          if (err) console.log(err);
        });
    }

    if (req.body.dayTwo) {
      BookingEvent.updateOne(
        {
          _id: req.body.eventId,
          'tribunes.name': req.body.tribune,
        },
        {
          $set: {
            'tribunes.$.dayTwo.seats': event.tribunes[tribuneNumber].dayTwo.seats - 1,
          }
        }, function (err, bookingEvent) {
          console.log(bookingEvent);
          if (err) console.log(err);
        });
    }

    if (req.body.dayThree) {
      BookingEvent.updateOne(
        {
          _id: req.body.eventId,
          'tribunes.name': req.body.tribune,
        },
        {
          $set: {
            'tribunes.$.dayThree.seats': event.tribunes[tribuneNumber].dayThree.seats - 1,
          }
        }, function (err, bookingEvent) {
          console.log(bookingEvent);
          if (err) console.log(err);
        });
    }
  });
});

router.delete('/:id', function(req, res) {
  UserBooking.findOneAndDelete({
    _id: req.params.id,
  })
    .then(userBooking => {
      if (!userBooking) {
        res.status(404).send('Booking with this ID was not found.');
      } else {
        res.status(200).send(userBooking);
      }
    })
});

module.exports = router;