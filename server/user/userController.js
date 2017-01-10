/* ---------------- * SERVER/USER/USERCONTROLLER.JS * ---------------
 *
 * This file contains all user methods and serves as an intermediary
 * layer between routes.js and userModel.js. Methods in this file are
 * responsible for invoking methods in the userModel.js
 *
 * Methods in this file are:
 *
 *  1) SIGN UP : signUp({ body: { name, username, email } }, res)
 *  2) SIGN IN : singIn({ body }, res)
 *  3) FIND USER : findUser({ params: { username } }, res)
 *
 * --------------------------------------------------------------- */

const bcrypt = require('bcrypt-nodejs');
// Plucks addUser methods from user/userModel.js
const { addUser, getUser, like, unlike } = require('./userModel');

module.exports = {
  //
  /* -------------------------- * SIGN UP * -------------------------
   *
   * Calls addUser method. (see user/userModel.js)
   * Sends 201 status as a response.
   *
   *  Parameters:
   *    • req | Object | request object
   *        - destuctured to pluck name, username, email, password, city, age, sex from its body
   *    • res | Object | response object
   *
   *  Returns:
   *    • No explicit return
   *
   * --------------------------------------------------------------- */

// Taking in job and education because Facebook provides the info
  signUp({ body: { name, username, email, password, city, age, sex, job = '', edLevel = '' } }, callback) {
    console.log(`1) [UserController.js/signup] Signing up ${name}`);
    getUser(username, (user) => {
      if (user) {
        callback(null);
      } else {
        const userData = { name, username, email, password, city, age, sex, job, edLevel };
        addUser(userData, () => {
          callback(userData);
        });
      }
    });
  },

  //
  /* -------------------------- * SIGN IN * -------------------------
   *
   * Calls getUser method. (see user/userModel.js)
   * If user is authenticated: send user data as a JSON object
   * If user is not authenticated: send 401 status
   *
   * -Sample API Route: /api/users/signin
   * -Sample req.body: {username: peter, password: peterpeter}
   * -Sample response object:
   *
      {
       "memberSince": {
         "low": 436259304,
         "high": 345
       },
       "password": "peterpeter",
       "name": "Peter Schussheim",
       "email": "peter@gmail.com",
       "username": "peter",
       "city": "New York",
       "age": "31",
       "sex": "Male"
      }
   *
   *  Parameters:
   *    • req | Object | request object
   *        - destuctured to pluck request body
   *    • res | Object | response object
   *
   *  Returns:
   *    • No explicit return
   *
   * --------------------------------------------------------------- */

  signIn({ body }, callback) {
    const attemptedPassword = body.password;
    const attemptedUsername = body.username;

    console.log(`1) [UserController.js/signIn] Authenticating for user with
    username: ${attemptedUsername}, password: ${attemptedPassword}`);

    getUser(attemptedUsername, (data) => {
      console.log(`4) [UserController.js/signIn] Success!
        Checking attempted password: ${body.password} against database`);

      // Getting User data
      const { properties: { username, memberSince, password, name, email, image_url } } = data.get('user');

      bcrypt.compare(body.password, password, (err, isMatch) => {
        if (err) {
          console.log('5) [UserController.js/signIn] Wrong password!');
          callback(err);
        }
        else if (isMatch) {
          // Getting User location data
          const city = data.get('city').properties.name;

          // Getting User age data
          const age = data.get('age').properties.age;

          // Getting User sex data
          const sex = data.get('sex').properties.sex;

          const result = { memberSince, password, name, email, username, city, age, sex, image_url };

          console.log('5) [UserController.js/signIn] Sending User data: ', result);
          callback(null, result);
        }
      })
    });
  },

  /* ------------------------- * FIND USER * -------------------------
   *
   * Calls getUser method. (see user/userModel.js)
   * Once it receives user data,
   *  chunks the data and build a result object for FE to use.
   * Sends a JSON stringified result object as a response.
   *
   * -Sample API Route: /api/users/sojung
   * -Sample req.params.username = 'sojung'
   * -Sample response object:
   *
      {
       "memberSince": {
         "low": 436259139,
         "high": 345
       },
       "name": "JW Garrison",
       "username": "jwgarrison",
       "city": "New York",
       "age": "29",
       "sex": "Male"
      }
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
      console.log('4) [UserController.js/getUser] Success! Chunking data & building res object', data);

      // Getting User data
      const { properties: { memberSince, name, email, job, edLevel, aboutMe, image_url } } = data.get('user');

      // Getting User location data
      const city = data.get('city').properties.name;

      // Getting User age data
      const age = data.get('age').properties.age;

      // Getting User sex data
      const sex = data.get('sex').properties.sex;


      const result = { memberSince, name, username, city, age, sex, email, job, edLevel, aboutMe, image_url };

      console.log('5) [UserController.js/getUser] Sending User data: ', result);
      res.json(result);
    });
  },
};
