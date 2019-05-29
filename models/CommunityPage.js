const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommunityPageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: true
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  date: {
    type: Date,
    required: true
  },
  pic: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: true
  },
  tags: {
    type: [String],
  },
  blocks: {}
},
  {
    collection: 'communitypage',
  });

const CommunityPage = mongoose.model('communitypage', CommunityPageSchema);

module.exports = CommunityPage;