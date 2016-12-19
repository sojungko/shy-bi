/* -------------- * SERVER/SEARCH/SEARCHCONTROLLER.JS * -------------
 *
 * This file contains all user methods and serves as an intermediary
 * layer between routes.js and searchModel.js. Methods in this file are
 * responsible for invoking methods in the searchModel.js
 *
 * Methods in this file are:
 *
 *
 * --------------------------------------------------------------- */

const { getAll } = require('./searchModel');

module.exports = {
  //
  /* -------------------------- * FIND ALL * -------------------------
   *
   * Calls getAll method (see serach/searchModel.js)
   * Once it receives all users data,
   *  chunks the data for each users to build a all users object for FE to use.
   * Sends a JSON stringified all users object as a response.
   *
   * - Sample response object:
   *
   *   // ALL USERS
   *   [
   *     // USER 1
   *     {
   *       "user": {
   *         "memberSince": {
   *           "low": 392509149,
   *           "high": 345
   *         },
   *         "password": "adamadam",
   *         "name": "Adam Wang",
   *         "email": "adam@gmail.com",
   *         "username": "adam"
   *       },
   *       "city": "New York",
   *       "age": "25"
   *     },
   *
   *     // USER 2
   *     {
   *       "user": {
   *         "memberSince": {
   *           "low": 392509026,
   *           "high": 345
   *         },
   *         "password": "timtim",
   *         "name": "Tim Yin",
   *         "email": "timyin@gmail.com",
   *         "username": "Tim"
   *       },
   *       "city": "New York",
   *       "age": "24"
   *     },
   *   ]
   *
   *  Returns:
   *    • No explicit return
   *
   * --------------------------------------------------------------- */
  findAll(req, res) {
    console.log('1) [SearchController.js/findAll] Searching all user');

    getAll((allUserData) => {
      console.log('4) [SearchController.js/findAll] Success! parsing data & building res object');

      const allUsers = allUserData.map((userData, index) => {
        console.log(`4-${index}) [SearchController.js/findAll] parsing user ${index} data`);

        // Getting User data
        const { properties: { memberSince, password, name, email, username } }
          = userData.get('user');

        // Getting User location data
        const { properties: { name: city } } = userData.get('city');

        // Getting User age data
        const { properties: { age } } = userData.get('age');

        // Putting together a user data object.
        const user = {
          user: { memberSince, password, name, email, username },
          city,
          age,
        };

        return user;
      });

      console.log('5) [SearchController.js/findAll] Sending All User info: ', allUsers);
      res.send(allUsers);
    });
  },
};
