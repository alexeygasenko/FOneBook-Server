const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsPageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
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
    required: true
  },
  type: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
  },
  blocks: {}
},
{
  collection: 'newspage',
});

const NewsPage = mongoose.model('newspage', NewsPageSchema);

module.exports = NewsPage;