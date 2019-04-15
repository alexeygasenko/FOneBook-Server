const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsPreviewSchema = new Schema({
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

const NewsPreview = mongoose.model('newsfeed', NewsPreviewSchema);

module.exports = NewsPreview;