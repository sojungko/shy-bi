/* -------------- * SERVER/SEARCH/SEARCHCONTROLLER.JS * -------------
 *
 * This file contains all user methods and serves as an intermediary
 * layer between routes.js and searchModel.js. Methods in this file are
 * responsible for invoking methods in the searchModel.js
 *
 * Methods in this file are:
 *
 *  1) FIND ALL USERS : findAll(req, res)
 *  2) FILTER USERS : getFilteredUsers({ query }, res)
 *
 * --------------------------------------------------------------- */

const debug = process.env.NODE_ENV === 'development' ? require('debug') : () => { };

const { getAll, getFilteredUsers, getLikedUsers } = require('./searchModel');

const log = debug('server:search:controller');

module.exports = {
  //
  /* -------------------------- * FIND ALL USERS* -------------------------
   *
   * Calls getAll method (see serach/searchModel.js)
   * Once it receives all users data,
   *  chunks the data for each users to build a all users object for FE to use.
   * Sends a JSON stringified all users object as a response.
   *
   *  Parameters:
   *    • req | Object | request object
   *    • res | Object | response object
   *
   * -Sample response object:
   *
      [
       {
         "memberSince": {
           "low": 436259579,
           "high": 345
         },
         "name": "Adam Wang",
         "username": "adam",
         "city": "New York",
         "age": "25",
         "sex": "Male"
       },
       {
         "memberSince": {
           "low": 436259472,
           "high": 345
         },
         "name": "Tim Yin",
         "username": "tim",
         "city": "New York",
         "age": "24",
         "sex": "Male"
       },
      ]
   *
   *  Returns:
   *    • No explicit return
   *
   * --------------------------------------------------------------- */
  findAllUsers(req, res) {
    log('[findAll] Searching all user');

    getAll((allUserData) => {
      log('[findAll] Success! parsing data & building res object');

      const allUsers = allUserData.map((userData, index) => {
        log(`${index}) [findAll] parsing user ${index} data`);

        // Getting User data
        const { properties: { memberSince, name, username, image_url, online } }
          = userData.get('user');

        // Getting User location data
        const city = userData.get('city').properties.name;

        // Getting User age data
        const age = userData.get('age').properties.age;

        // Getting User sex data
        const sex = userData.get('sex').properties.sex;

        // Putting together a user data object.
        const user = { memberSince, name, username, city, age, sex, image_url, online };

        return user;
      });

      log('[findAll] Sending All User info: ', allUsers);
      res.send(allUsers);
    });
  },

  /* -------------------------- * FILTER USERS * -------------------------
   *
   * Calls getFilteredUsers method (see serach/searchModel.js)
   * Once it receives all users data,
   *  chunks the data for each users to build a all users object for FE to use.
   * Sends a JSON stringified all users object as a response.
   *
   *  Parameters:
   *    • req | Object | request object
   *        - destuctured to pluck query object
   *    • res | Object | response object
   *
   * -Sample API Route: /api/search/filter?age=29&city=New York
   * -Sample req.query = {age: '29', city: 'New York'}
   * -Sample response object:

      [
       {
         "memberSince": {
           "low": 436259579,
           "high": 345
         },
         "name": "Adam Wang",
         "username": "adam",
         "city": "New York",
         "age": "25",
         "sex": "Male"
       }
      ]

   *
   *  Returns:
   *    • No explicit return
   *
   * --------------------------------------------------------------- */

  filterUsers({ query }, res) {
    log(`[filterUsers] Filtering users by
      minage: ${query.minage}, maxage: ${query.maxage}, city: ${query.city}, sex: ${query.sex}`);

    getFilteredUsers(query, (filteredUserData) => {
      log(`[filterUsers] Success!
        Chunking data & building res object`);

      const filteredUsers = filteredUserData.map((userData, index) => {
        log(`${index}) [filterUsers] parsing user ${index} data`);

        // Getting User data
        const { properties: { memberSince, name, username, image_url, online } }
          = userData.get('user');

        // Getting User location data
        const city = userData.get('city').properties.name;

        // Getting User age data
        const age = userData.get('age').properties.age;

        // Getting User sex data
        const sex = userData.get('sex').properties.sex;

        // Putting together a user data object.
        const user = { memberSince, name, username, city, age, sex, image_url, online };

        return user;
      });

      log('[filterUsers] Sending User data: ', filteredUsers);
      res.json(filteredUsers);
    });
  },

/* -------------------------- * FIND LIKED USERS * ------------------------- */
  findLikedUsers({ params }, res) {
    log(`[findLikedUsers] Searching ${params.username}'s liked users`);
    getLikedUsers(params, (likedUsersData) => {
      const likedUsers = likedUsersData.map((userData) => {
        const { properties: { memberSince, name, username, image_url, online } } = userData.get('liked');
        const city = userData.get('city').properties.name;
        const age = userData.get('age').properties.age;
        const sex = userData.get('sex').properties.sex;
        const likedUser = { memberSince, name, username, city, age, sex, image_url, online };

        return likedUser;
      });

      log('[filterUsers] Sending User data: ', likedUsers);
      res.json(likedUsers);
    });
  },
};
