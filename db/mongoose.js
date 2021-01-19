const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
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