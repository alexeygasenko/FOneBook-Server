const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserBookingSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'bookingevent' },
  tribune: {
    type: String,
    required: true,
  },
  dayOne: {
    type: Boolean,
    required: true,
  },
  dayTwo: {
    type: Boolean,
    required: true,
  },
  dayThree: {
    type: Boolean,
    required: true,
  }
},
{
  collection: 'userbooking',
});

const UserBooking = mongoose.model('userbooking', UserBookingSchema);

module.exports = UserBooking;