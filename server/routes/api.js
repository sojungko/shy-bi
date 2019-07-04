import express from 'express';

// Plucks signup method from user/user-controller.js
import { findUser, signOut } from '../user/user-controller';
import {
  findAllUsers,
  filterUsers,
  findLikedUsers,
} from '../search/search-controller';
import {
  findAllMessages,
  sendMessage,
  sentMessages,
  readMsg,
  findUnreadMessages,
} from '../messages/messages-controller';
import { getRecommendedMatches } from '../recommendations/recommendations-controller';
import { editBio, deleteImage, uploadImage } from '../bio/bio-controller';
import {
  getMatches,
  viewMatch,
  findNewMatches,
} from '../matches/matches-controller';
import { likeUser, unlikeUser } from '../likes/likes-controller';
import { getLocations } from '../location/location-controller';

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
 *     - Calls signUp function in the user/user-controller.js
 *  b) Log In
 *    i) POST request to: 'api/users/signin'
 *     - Calls signIn function in the user/user-controller.js
 *  c) Find User
 *    i) GET request to: 'api/users:username'
 *     - Calls findUser function in the user/user-controller.js
 *  d) Like User
 *    i) POST request to: '/api/users/like'
 *
 * 2) Search
 *  a) All Users
 *    i) GET request to: 'api/search/all'
 *      - Calls findAllUsers in search/search-controller.js
 *  b) Filter User
 *    i) GET request to: 'api/search/filter?sex={sex}&age={age}&city={city}'
 *      - Calls filterUsers in search/search-controller.js
 *
 * 3) Messages
 *  a) Find All Messsages
 *    i) GET request to: '/api/messages/all:username'
 *      - Calls getAllMessages in the messages/messages-controller.js
 *  b) Send Message
 *    ii) POST request to: '/api/messages/send'
 *      - Calls sendMessage in the messages/messages-controller.js
 *  C) Find Sent Messages
 *    iii) GET request to: '/api/messages/sent'
 *      - Calls sendMessage in the messages/messages-controller.js
 *
 * ------------------------------------------------------------- */

// 1-c-i) GET -> file: user/user-controller.js, method: getUser
router.get('/users/:username', findUser);

// 1-d-i) POST -> file: user/user-controller.js, method: likeUser
router.post('/users/like', likeUser);

// 1-e-1) POST -> file: user/user-controller.js, methoq: unlikeUser
router.post('/users/unlike', unlikeUser);

// 1-e-1) POST -> file: user/user-controller.js, methoq: unlikeUser
router.post('/signout', signOut);

// 2-a-i) GET -> file: search/search-controller.js method: findAllUsers
router.get('/search/all', findAllUsers);

// 2-b-i) GET -> file: search/search-controller.js method:
router.get('/search/filter', filterUsers);

// 2-c-i) GET -> file: search/search-controller.js method:
router.get('/search/liked/:username', findLikedUsers);

// 3-a-i) GET -> file: messages/messages-controller.js method:
router.get('/messages/all/:username', findAllMessages);

// 3-a-ii) POST -> file: messages/messages-controller.js method:
router.post('/messages/send', sendMessage);

// 3-a-iii) GET -> file: messages/messages-controller.js method:
router.get('/messages/sent/:username', sentMessages);

router.post('/messages/read', readMsg);

router.get('/messages/unread/:username', findUnreadMessages);

// 4-a-i) GET -> file: recommendations/recommendations-controller.js method:
router.get('/recommendations/:username', getRecommendedMatches);

// 5-a-i) POST -> file: bio/bio-controller.js
router.post('/bio/edit_bio', editBio);

// 5-b-i) POST -> file: bio/bio-controller.js
router.post('/bio/delete_image', deleteImage);

// 5-c-i) POST -> file: bio/bio-controller.js
router.post('/bio/upload_image', uploadImage);

// 6-a-i)
router.get('/matches/:username', getMatches);

router.post('/matches/view', viewMatch);

router.get('/matches/newmatches/:username', findNewMatches);

router.post('/getlocations', getLocations);

export default router;
