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
const configPassport = require('./auth/passport');
const flash = require('connect-flash');
const session = require('express-session');
const routes = require('./routes');
const dbinit = require('./database/initialize');

const app = express();
configPassport(passport);
dbinit();

app.use(session({ secret: 'imshy' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

// Deligates all routing to routes.js
routes(app, passport);

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
