const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  text: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
},
  {
    collection: 'comments',
  });

const Comment = mongoose.model('comments', CommentSchema);

module.exports = Comment;