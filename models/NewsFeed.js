const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsFeedSchema = new Schema({
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
    }
},
{
    collection: 'newsfeed',
});

const NewsFeed = mongoose.model('newsfeed', NewsFeedSchema);

module.exports = NewsFeed;