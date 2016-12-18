/* ----------------------- * SERVER/SERVER.JS * ---------------------
 *
 * This file:
 *  1) Starts the application Express server, and
 *  2) Deligates all server-side routing to routes.js
 *
 * --------------------------------------------------------------- */

const express = require('express');
const routes = require('./routes');
const dbinit = require('./database/initialize');

const app = express();
dbinit();

// Deligates all routing to routes.js
routes(app, express);

const port = process.env.PORT || 8080;

app.listen(port, (err) => {
  if (err) {
    console.error('Cannot start server: ', err);
  } else {
    console.log('Shy-bi is listening to port : ', port);
  }
});
