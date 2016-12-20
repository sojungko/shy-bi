/* -------------- * SERVER/SEARCH/SEARCHCONTROLLER.JS * -------------
 *
 * This file contains all user methods and serves as an intermediary
 * layer between routes.js and searchModel.js. Methods in this file are
 * responsible for invoking methods in the searchModel.js
 *
 * Methods in this file are:
 *
 *  1) FIND ALL : findAll(req, res)
 *  2) FILTER USERS : getMatches( { query: { sex, age, city } }, res)
 * --------------------------------------------------------------- */

const { getAll, getMatches } = require('./searchModel');

module.exports = {
  //
  /* -------------------------- * FIND ALL * -------------------------
   *
   * Calls getAll method (see serach/searchModel.js)
   * Once it receives all users data,
   *  chunks the data for each users to build a all users object for FE to use.
   * Sends a JSON stringified all users object as a response.
   *
   * -Sample response object:
   *
      [
       {
         "user": {
           "memberSince": {
             "low": 392509149,
             "high": 345
           },
           "password": "adamadam",
           "name": "Adam Wang",
           "email": "adam@gmail.com",
           "username": "adam"
         },
         "city": "New York",
         "age": "25"
       },
       {
         "user": {
           "memberSince": {
             "low": 392509026,
             "high": 345
           },
           "password": "timtim",
           "name": "Tim Yin",
           "email": "timyin@gmail.com",
           "username": "Tim"
         },
         "city": "New York",
         "age": "24"
       },
      ]
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

  /* -------------------------- * FILTER USERS * -------------------------
   *
   * Calls getMatches method (see serach/searchModel.js)
   * Once it receives all users data,
   *  chunks the data for each users to build a all users object for FE to use.
   * Sends a JSON stringified all users object as a response.
   *
   * -Sample API Route: /api/search/filter?age=29&city=New York
   * -Sample req.query = {age: '29', city: 'New York'}
   * -Sample response object:

      [
        {
          "user": {
            "memberSince": {
              "low": 392508732,
              "high": 345
            },
            "password": "justinjustin",
            "name": "JW Garrison",
            "email": "jwolfgarrison@gmail.com",
            "username": "jwgarrison"
          },
          "city": "New York",
          "age": "29"
        }
      ]

   *
   *  Returns:
   *    • No explicit return
   *
   * --------------------------------------------------------------- */

  filterUsers({ query: { age, city } }, res) {
    console.log(`1) [SearchController.js/filterUsers] Filtering users by
      age: ${age}, city: ${city}`);

    getMatches(age, city, (filteredUserData) => {
      console.log(`4) [SearchController.js/filterUsers] Success!
        Chunking data & building res object`);

      const filteredUsers = filteredUserData.map((userData, index) => {
        console.log(`4-${index}) [SearchController.js/filterUsers] parsing user ${index} data`);

        // Getting User data
        const { properties: { memberSince, password, name, email, username } }
          = userData.get('user');

        // Putting together a user data object.
        const user = {
          user: { memberSince, password, name, email, username },
          city,
          age,
        };

        return user;
      });

      console.log('5) [SearchController.js/filterUsers] Sending User data: ', filteredUsers);
      res.json(filteredUsers);
    });
  },
};
