const mongoose = require('mongoose');
const MONGODB_URL = require('../common/config/env.config').mongodb_url;

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection couldn\'t be established.', err);
});

mongoose.connection.on('connected', (err, res) => {
    console.log('Mongoose connection was established successfully.');
});