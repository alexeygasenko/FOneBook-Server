const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookingEventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  tribunes: {}
},
{
  collection: 'bookingevent',
});

const BookingEvent = mongoose.model('bookingevent', BookingEventSchema);

module.exports = BookingEvent;