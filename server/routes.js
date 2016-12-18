/* ---------------------- * SERVER/ROUTES.JS * ----------------------
 *
 * This file:
 *  1) Loads Express middlewears,
 *  2) Serves static files, and
 *  3) Handles all server-side routing
 *
 * --------------------------------------------------------------- */

const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

// Plucks signup method from user/userController.js
const { signUp } = require('./user/userController');

module.exports = (app, express) => {
  //
  /* ----------- * Binding Application Level Middlewears * ----------
   * 1) bodyParser, and
   * 2) morgan logger
   * ------------------------------------------------------------- */

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(morgan('dev'));

  /* ------------------- * Serving Static Files * -------------------
   * Files in:
   *
   *  1) Node Modules Directory, and
   *  2) Build Directory
   * ------------------------------------------------------------- */

  app.use(express.static(path.join(__dirname, '/../node_modules')));
  app.use(express.static(path.join(__dirname, '/../build')));

  /* ---------------------------- Router ----------------------------
   * Use Command/Ctrl + F to search for a route
   *
   * Format: Controller(Int, eg: 1)-Method(string, eg: a)-HTTP Method Type(roman numeral, eg: i)
   * example: Search for 2-a-i to look for  "2) User a) Sign Up i) POST"
   *
   * 1) Root
   *  i) GET request to: '/'
   *   - Returns a string to render
   *
   * 2) Users
   *  a) Sign Up
   *    i) POST request to: '/api/users/signup'
   *     - Calls signup function in the user/userController.js
   * ------------------------------------------------------------- */

  // 1-i) GET
  app.get('/', (req, res) => {
    res.send('<h1>DATA STRUCTURE DUCKS!<h1>');
  });

  // 2-a-i) POST -> file: user/userController.js, method: signup
  app.post('/api/users/signup', signUp);
};
