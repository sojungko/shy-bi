/* ----------------------- * SERVER/SERVER.JS * ---------------------
 *
 * This file:
 *  1) Starts the application Express server, and
 *  2) Deligates all server-side routing to routes.js
 *
 * --------------------------------------------------------------- */

const express = require('express');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dbinit = require('./database/initialize');

const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
const facebookLoginStrategy = require('./passport/facebook');
// const authCheckMiddleware = require('./passport/auth-check');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

const app = express();
dbinit();

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);
passport.use('facebook-login', facebookLoginStrategy);

// pass the authenticaion checker middleware
// app.use('/api', authCheckMiddleware);

// routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// // Deligates all routing to routes.js
// routes(app, passport);

/* ------------------- * Serving Static Files * -------------------
 * Files in:
 *
 *  1) Node Modules Directory, and
 *  2) Build Directory
 * ------------------------------------------------------------- */

app.use(express.static(path.join(__dirname, '/../node_modules')));
app.use(express.static(path.join(__dirname, '/../')));

const port = process.env.PORT || 8080;

app.listen(port, (err) => {
  if (err) {
    console.error('Cannot start server: ', err);
  } else {
    console.log('Shy-bi is listening to port : ', port);
  }
});
