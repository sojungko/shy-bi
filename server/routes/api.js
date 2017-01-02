const express = require('express');

// Plucks signup method from user/userController.js
const { findUser, likeUser, unlikeUser } = require('../user/userController');
const { findAllUsers, filterUsers } = require('../search/searchController');
const { findAllMessages, sendMessage, sentMessages } = require('../messages/messagesController');

const router = new express.Router();


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

// 1-c-i) GET -> file: user/userController.js, method: getUser
router.get('/users/:username', findUser);

// 1-d-i) POST -> file: user/userController.js, method: likeUser
router.post('/users/like', likeUser);

// 1-e-1) POST -> file: user/userController.js, methoq: unlikeUser
router.post('/users/unlike', unlikeUser);

// 2-a-i) GET -> file: search/searchController.js method: findAllUsers
router.get('/search/all', findAllUsers);

// 2-b-i) GET -> file: search/searchController.js method:
router.get('/search/filter', filterUsers);

// 3-a-i) GET -> file: messages/messagesController.js method:
router.get('/messages/all/:username', findAllMessages);

// 3-a-ii) POST -> file: messages/messagesController.js method:
router.post('/messages/send', sendMessage);

// 3-a-iii) GET -> file: messages/messagesController.js method:
router.get('/messages/sent/:username', sentMessages);

module.exports = router;
