const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number
  },
  nameChangeAttempts: {
    type: Number
  },
  bookings: { type: mongoose.Schema.Types.ObjectId, ref: 'userbooking' }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;