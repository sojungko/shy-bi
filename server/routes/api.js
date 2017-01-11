const express = require('express');

// Plucks signup method from user/userController.js
const { findUser, signOut } = require('../user/userController');
const { findAllUsers, filterUsers, findLikedUsers } = require('../search/searchController');
const { findAllMessages, sendMessage, sentMessages, readMsg } = require('../messages/messagesController');
const { getRecommendedMatches } = require('../recommendations/recommendationsController');
const { editBio, deleteImage, uploadImage } = require('../bio/bioController');
const { getMatches } = require('../matches/matchesController');
const { likeUser, unlikeUser } = require('../likes/likesController');
const { getLocations } = require('../location/locationController');

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

// 1-e-1) POST -> file: user/userController.js, methoq: unlikeUser
router.post('/signout', signOut);

// 2-a-i) GET -> file: search/searchController.js method: findAllUsers
router.get('/search/all', findAllUsers);

// 2-b-i) GET -> file: search/searchController.js method:
router.get('/search/filter', filterUsers);

// 2-c-i) GET -> file: search/searchController.js method:
router.get('/search/liked/:username', findLikedUsers);

// 3-a-i) GET -> file: messages/messagesController.js method:
router.get('/messages/all/:username', findAllMessages);

// 3-a-ii) POST -> file: messages/messagesController.js method:
router.post('/messages/send', sendMessage);

// 3-a-iii) GET -> file: messages/messagesController.js method:
router.get('/messages/sent/:username', sentMessages);

router.post('/messages/read', readMsg);

// 4-a-i) GET -> file: recommendations/recommendationsController.js method:
router.get('/recommendations/:username', getRecommendedMatches);

// 5-a-i) POST -> file: bio/bioController.js
router.post('/bio/edit_bio', editBio);

// 5-b-i) POST -> file: bio/bioController.js
router.post('/bio/delete_image', deleteImage);

// 5-c-i) POST -> file: bio/bioController.js
router.post('/bio/upload_image', uploadImage);

// 6-a-i)
router.get('/matches/:username', getMatches);

router.post('/getlocations', getLocations);

module.exports = router;
