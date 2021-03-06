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
    type: Number,
    required: true
  },
  isModerator: {
    type: Boolean,
    required: true
  },
  nameChangeAttempts: {
    type: Number,
    required: true
  },
  bookings: { type: mongoose.Schema.Types.ObjectId, ref: 'userbooking' }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;