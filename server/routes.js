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
const { signUp, findUser } = require('./user/userController');
const { findAll, filterUsers } = require('./search/searchController');

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
   * Format: End Point(Int, eg: 1)-Method(string, eg: a)-HTTP Method(roman numeral, eg: i)
   * example: Search for 2-a-i to look for  "2) User a) Sign Up i) POST"
   *
   * 1) Users
   *  a) Sign Up
   *    i) POST request to: '/api/users/signup'
   *     - Calls signUp function in the user/userController.js
   *  b) Get User
   *    i) GET request to: 'api/users:username'
   *     - Calls findUser function in the user/userController.js
   *
   * 2) Search
   *  a) All Users
   *    i) GET request to: 'api/search/all'
   *      - Calls findAll in search/searchController.js
   *  b) Filter User
   *    i) GET request to: 'api/search/filter?sex={sex}&age={age}&city={city}'
   *      - Calls filterUsers in search/searchController.js
   * ------------------------------------------------------------- */

<<<<<<< HEAD
  // 1-a-i) POST -> file: user/userController.js, method: signUp
=======
  // 2-a-i) POST -> file: user/userController.js, method: signUp
>>>>>>> fix(server.js):
  app.post('/api/users/signup', signUp);

  // 1-b-i) GET -> file: user/userController.js, method: getUser
  app.get('/api/users/:username', findUser);

  // 2-a-i) GET -> file: search/searchController.js method: findAll
  app.get('/api/search/all', findAll);

  // 2-b-i) GET -> file: search/searchController.js method:
  app.get('/api/search/filter', filterUsers);
};
