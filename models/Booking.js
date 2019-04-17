const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  coutry: {
    type: String,
    required: true
  },
  seat: {
    type: String,
    required: true,
    tribune: {
      type: String,
      required: true
    }
  }
},
{
  collection: 'booking',
});

const Booking = mongoose.model('booking', BookingSchema);

module.exports = Booking;