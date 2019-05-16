const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DriverSeasonSchema = new Schema({
  year: {
    type: Number,
    required: true
  },
  points: {
    type: Number,
    required: true
  }
});

const DriverSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  countryFlag: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  dateOfDeath: {
    type: Date
  },
  yearStart: {
    type: Number,
    required: true
  },
  yearEnd: {
    type: Number
  },
  currentTeam: {
    type: mongoose.Schema.Types.ObjectId, ref: 'teams' 
  },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'teams' }],
  season: {
    type: [DriverSeasonSchema]
  }
},
{
  collection: 'drivers',
});

const Driver = mongoose.model('drivers', DriverSchema);

module.exports = Driver;