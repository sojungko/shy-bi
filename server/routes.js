/* ---------------------- * SERVER/ROUTES.JS * ----------------------
 *
 * This file:
 *  1) Loads Express middlewears,
 *    • bodyParser (Creates body object)
 *    • path
 *    • morgan (Logger)
 *    • passport (Authentication)
 *    • flash
 *    • cookieParser
 *  2) Serves static files, and
 *  3) Handles all server-side routing
 *
 * --------------------------------------------------------------- */

const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Plucks signup method from user/userController.js
const { signUp, signIn, findUser, likeUser } = require('./user/userController');
const { findAllUsers, filterUsers } = require('./search/searchController');
const { findAllMessages, sendMessage, sentMessages } = require('./messages/messagesController');

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
  app.use(express.static(path.join(__dirname, '/../')));

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
   *  b) Log In
   *    i) POST request to: 'api/users/signin'
   *     - Calls signIn function in the user/userController.js
   *  c) Find User
   *    i) GET request to: 'api/users:username'
   *     - Calls findUser function in the user/userController.js
   *  d) Like User
   *    i) POST request to: '/api/users/like'
   *
   * 2) Search
   *  a) All Users
   *    i) GET request to: 'api/search/all'
   *      - Calls findAllUsers in search/searchController.js
   *  b) Filter User
   *    i) GET request to: 'api/search/filter?sex={sex}&age={age}&city={city}'
   *      - Calls filterUsers in search/searchController.js
   *
   * 3) Messages
   *  a) Find All Messsages
   *    i) GET request to: '/api/messages/all:username'
   *      - Calls getAllMessages in the messages/messagesController.js
   *  b) Send Message
   *    ii) POST request to: '/api/messages/send'
   *      - Calls sendMessage in the messages/messagesController.js
   *  C) Find Sent Messages
   *    iii) GET request to: '/api/messages/sent'
   *      - Calls sendMessage in the messages/messagesController.js
   *
   * ------------------------------------------------------------- */

  // 1-a-i) POST -> file: user/userController.js, method: signUp
  app.post('/api/users/signup', signUp);

  // 1-b-i) POST -> file: user/userController.js, method: signUp
  app.post('/api/users/signin', signIn);

  // 1-c-i) GET -> file: user/userController.js, method: getUser
  app.get('/api/users/:username', findUser);

  // 1-d-i) POST -> file: user/userController.js, method: likeUser
  app.post('/api/users/like', likeUser);

  // 2-a-i) GET -> file: search/searchController.js method: findAllUsers
  app.get('/api/search/all', findAllUsers);

  // 2-b-i) GET -> file: search/searchController.js method:
  app.get('/api/search/filter', filterUsers);

  // 3-a-i) GET -> file: messages/messagesController.js method:
  app.get('/api/messages/all/:username', findAllMessages);

  // 3-a-ii) POST -> file: messages/messagesController.js method:
  app.post('/api/messages/send', sendMessage);

  // 3-a-iii) GET -> file: messages/messagesController.js method:
  app.get('/api/messages/sent/:username', sentMessages);
};
