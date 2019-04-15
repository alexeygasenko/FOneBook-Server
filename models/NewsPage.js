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
  date: {
    type: Date,
    required: true
  },
  blocks: {}
},
{
  collection: 'newspage',
});

const NewsPage = mongoose.model('newspage', NewsPageSchema);

module.exports = NewsPage;