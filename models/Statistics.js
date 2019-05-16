const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StatisticsSchema = new Schema({
  year: {
    type: Number,
    required: true
  },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'teams' }],
  drivers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'drivers' }]
},
{
  collection: 'statistics',
});

const Statistics = mongoose.model('statistics', StatisticsSchema);

module.exports = Statistics;