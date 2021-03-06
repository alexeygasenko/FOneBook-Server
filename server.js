const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const config = require('./db');

const users = require('./routes/user');

const newsFeed = require('./routes/newsFeed');
const newsPage = require('./routes/newsPage');

const communityFeed = require('./routes/communityFeed');
const communityPage = require('./routes/communityPage');

const historyFeed = require('./routes/historyFeed');
const historyPage = require('./routes/historyPage');

const autoFeed = require('./routes/autoFeed');
const autoPage = require('./routes/autoPage');

const comments = require('./routes/comments');

require('./models/Team');
require('./models/Driver');
const statistics = require('./routes/statistics');

const booking = require('./routes/booking');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('images'));

app.use('/api/users', users);

app.use('/api/news', newsFeed);
app.use('/api/news', newsPage);

app.use('/api/community', communityFeed);
app.use('/api/community', communityPage);

app.use('/api/history', historyFeed);
app.use('/api/history', historyPage);

app.use('/api/auto', autoFeed);
app.use('/api/auto', autoPage);

app.use('/api/stats', statistics);

app.use('/api/bookings', booking);

app.use('/api/comments', comments);

app.get('/', function (req, res) {
  res.send('Hello from the FOneBook website!');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});