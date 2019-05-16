const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SeasonSchema = new Schema({
  year: {
    type: Number,
    required: true
  },
  points: {
    type: Number,
    required: true
  }
});

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  season: {
    type: [SeasonSchema]
  }
});

const Team = mongoose.model('teams', TeamSchema);

module.exports = Team;