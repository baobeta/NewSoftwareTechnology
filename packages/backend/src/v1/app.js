/* eslint-disable no-console */
const bodyParser = require('body-parser');
const passport = require('passport');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const _ = require('lodash');
const AccessDenied = require('./utils/errors/AppError');
const userRoutes = require('./routes/user.route');
const topicRoutes = require('./routes/topic.route');
require('./config/passport')(passport);

const app = express();

app.use(bodyParser.json());

// allow cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header('Access-Control-Max-Age', 3600);
  next();
});

// handle error controller
// need exactly 4 params for express to recognize
// http://expressjs.com/en/guide/error-handling.html#the-default-error-handler
/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  console.log(JSON.stringify({ stack: err.stack, message: err.message }));
  if (res.headerSent) return next(err);
  const errorType = _.get(err, 'constructor.name', 'Error');
  switch (errorType) {
    case AccessDenied.name:
      return res.status(err.status).send(err.message);
    default:
      return res.sendStatus(500);
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// add router
userRoutes(app);
topicRoutes(app);

module.exports = app;
