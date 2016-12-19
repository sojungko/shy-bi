/* ---------------- * SERVER/USER/USERCONTROLLER.JS * ---------------
 *
 * This file contains all user methods and serves as an intermediary
 * layer between routes.js and userModel.js. Methods in this file are
 * responsible for invoking methods in the userModel.js
 *
 * Methods in this file are:
 *
 *  1) SIGN UP : signUp({ body: { name, username, email } }, res)
 *
 * --------------------------------------------------------------- */

// Plucks addUser methods from user/userModel.js
const { addUser, getUser } = require('./userModel');

module.exports = {
  //
  /* -------------------------- * SIGN UP * -------------------------
   *
   * Calls addUser method. (see user/userModel.js)
   * Sends 201 status as a response.
   *
   *  Parameters:
   *    • req | Object | request object
   *        - destuctured to pluck name, username, and email from its body
   *    • res | Object | response object
   *
   *  Returns:
   *    • No explicit return
   *
   * --------------------------------------------------------------- */

  signUp({ body: { name, username, email, password, city, age } }, res) {
    console.log(`1) [UserController.js/signup] Signing up ${name}`);

    addUser(name, username, email, password, city, age, () => {
      console.log('4) [UserController.js/singup] Success, sending back 201 status');
      res.sendStatus(201);
    });
  },

  /* ------------------------- * FIND USER * -------------------------
   *
   * Calls getUser method. (see user/userModel.js)
   * Once it receives user data,
   *  chunks the data and build a result object for FE to use.
   * Sends a JSON stringified result object as a response.
   *
   * - Sample response object:
   *
   *   {
   *    "user": {
   *      "memberSince": {
   *         "low": 341094756,
   *        "high": 345
   *      },
   *      "password": "sojungsojung",
   *      "name": "So Jung Park",
   *      "email": "sojung@gmail.com",
   *      "username": "sojung"
   *    },
   *    "city": "New York",
   *    "age": 28
   *  }
   *
   *  Parameters:
   *    • req | Object | request object
   *        - destuctured to pluck username, from its params object
   *    • res | Object | response object
   *
   *  Returns:
   *    • No explicit return
   *
   * --------------------------------------------------------------- */

  findUser({ params: { username } }, res) {
    console.log(`1) [UserController.js/getUser] Searching for user with username: ${username}`);

    getUser(username, (data) => {
      console.log('4) [UserController.js/getUser] Success! Chucking data & building res object');

      const { properties: { memberSince, password, name, email } } = data.get('user');
      const city = data.get('city');
      const { properties: { age } } = data.get('age');

      const result = {
        user: { memberSince, password, name, email, username },
        city: city.properties.name,
        age: age.low,
      };

      console.log('5) [UserController.js/getUser] Sending User data: ', result);
      res.json(result);
    });
  },
};
