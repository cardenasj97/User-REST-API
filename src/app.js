const express = require('express');
const bodyParser = require('body-parser')
require('./db/mongoose');
const userRouter = require('./users/routes.config');
const authRouter = require('./auth/routes.config');

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); //if false then parse only strings
app.use(bodyParser.json());
app.use(userRouter);
app.use(authRouter);

module.exports = app;