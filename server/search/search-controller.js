/* -------------- * SERVER/SEARCH/SEARCHCONTROLLER.JS * -------------
 *
 * This file contains all user methods and serves as an intermediary
 * layer between routes.js and search-model.js. Methods in this file are
 * responsible for invoking methods in the search-model.js
 *
 * Methods in this file are:
 *
 *  1) FIND ALL USERS : findAll(req, res)
 *  2) FILTER USERS : getFilteredUsers({ query }, res)
 *
 * --------------------------------------------------------------- */

import debug from 'debug';

import { getAll, getFilteredUsers, getLikedUsers } from './search-model';

const log = debug('server:search:controller');

//
/* -------------------------- * FIND ALL USERS* -------------------------
 *
 * Calls getAll method (see serach/search-model.js)
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
export function findAllUsers(req, res) {
  const local = log.extend('findAll');

  getAll((allUsers) => {
    local('Success! parsing data & building res object');

    // const allUsers = allUserData.map((data, index) => {
    //   log(`${index}) parsing user ${index} data`);

    //   // Getting User data
    //   const { properties = {} } = data.get('user');
    //   const { username, image_url, online } = properties;

    //   const age = Math.floor(intsToNumbers(data.get('age')).months / 12);
    //   // Putting together a user data object.
    //   const user = { age, username, image_url, online };

    //   return user;
    // });

    local('Sending All User info: ', allUsers);
    res.send(allUsers);
  });
}

/* -------------------------- * FILTER USERS * -------------------------
 *
 * Calls getFilteredUsers method (see serach/search-model.js)
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

export function filterUsers({ query }, res) {
  const local = log.extend('filterUsers');
  local(`Filtering users by
      minage: ${query.minage}, maxage: ${query.maxage}, sex: ${query.sex}`);

  getFilteredUsers(query, (filteredUsers) => {
    local(`Success!
        Chunking data & building res object`);

    local('Sending User data: ', filteredUsers);
    res.json(filteredUsers);
  });
}

/* -------------------------- * FIND LIKED USERS * ------------------------- */
export function findLikedUsers({ params }, res) {
  const local = log.extend('findLikedUsers');
  local(`Searching ${params.username}'s liked users`);
  getLikedUsers(params, (likedUsers) => {

    local('Sending User data: ', likedUsers);
    res.json(likedUsers);
  });
}
