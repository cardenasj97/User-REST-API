const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config();
require('./db/mongoose');
const userRouter = require('./users/routes.config');

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); //if false then parse only strings
app.use(bodyParser.json());
app.use(userRouter);

module.exports = app;