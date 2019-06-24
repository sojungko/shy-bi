/* ----------------------- * SERVER/SERVER.JS * ---------------------
 *
 * This file:
 *  1) Starts the application Express server, and
 *  2) Deligates all server-side routing to routes.js
 *
 * --------------------------------------------------------------- */

const express = require('express');
const next = require('next');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const debug = require('debug');

const dbinit = require('./db/initialize');

const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
const facebookLoginStrategy = require('./passport/facebook');
// const authCheckMiddleware = require('./passport/auth-check');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

const { NODE_ENV } = process.env;
const log = debug('server:server').bind(this);

const app = next({ dev: NODE_ENV === 'development' });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    dbinit();

    server.use(bodyParser.urlencoded({
      extended: true,
    }));
    server.use(bodyParser.json());
    server.use(morgan('dev'));

    // pass the passport middleware
    server.use(passport.initialize());

    // load passport strategies
    passport.use('local-signup', localSignupStrategy);
    passport.use('local-login', localLoginStrategy);
    passport.use('facebook-login', facebookLoginStrategy);

    // pass the authenticaion checker middleware
    // server.use('/api', authCheckMiddleware);

    // routes
    server.use('/auth', (req, res, next) => { log('here!!'); next(); }, authRoutes);
    server.use('/api', apiRoutes);

    // // Deligates all routing to routes.js
    // routes(server, passport);

    /* ------------------- * Serving Static Files * -------------------
    * Files in:
    *
    *  1) Node Modules Directory, and
    *  2) Build Directory
    * ------------------------------------------------------------- */

    server.use(express.static(path.join(__dirname, '/../node_modules')));
    server.use(express.static(path.join(__dirname, '/../')));

    server.get('*', (req, res) => handle(req, res));


    const port = process.env.PORT || 8080;

    server.listen(port, (err) => {
      if (err) {
        console.error('Cannot start server: ', err);
      } else {
        console.log('Shy-bi is listening to port : ', port);
      }
    });
  });

