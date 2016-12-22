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
   *        - destuctured to pluck name, username, email, password, city, age, sex from its body
   *    • res | Object | response object
   *
   *  Returns:
   *    • No explicit return
   *
   * --------------------------------------------------------------- */

  signUp({ body: { name, username, email, password, city, age, sex } }, res) {
    console.log(`1) [UserController.js/signup] Signing up ${name}`);

    addUser(name, username, email, password, city, age, sex, () => {
      console.log('4) [UserController.js/singup] Success, sending back 201 status');
      res.sendStatus(201);
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
       "city": "Peter Schussheim",
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

  signIn({ body }, res) {
    const attemptedPassword = body.password;
    const attemptedUsername = body.username;

    console.log(`1) [UserController.js/getUser] Authenticating for user with
    username: ${attemptedUsername}, password: ${attemptedPassword}`);

    getUser(attemptedUsername, (data) => {
      console.log(`4) [UserController.js/getUser] Success!
        Checking attempted password: ${body.password} against database`);

      // Getting User data
      const { properties: { username, memberSince, password, name, email } } = data.get('user');

      if (body.password !== password) {
        console.log('5) [UserController.js/getUser] Wrong password!');
        res.sendStatus(401);
      } else {
        // Getting User location data
        const { properties: { city = name } } = data.get('city');

        // Getting User age data
        const { properties: { age } } = data.get('age');

        // Getting User age data
        const { properties: { sex } } = data.get('sex');

        const result = { memberSince, password, name, email, username, city, age, sex };

        console.log('5) [UserController.js/getUser] Sending User data: ', result);
        res.json(result);
      }
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
       "city": "JW Garrison",
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
      console.log('4) [UserController.js/getUser] Success! Chunking data & building res object');

      // Getting User data
      const { properties: { memberSince, password, name, email } } = data.get('user');

      // Getting User location data
      const { properties: { city = name } } = data.get('city');

      // Getting User age data
      const { properties: { age } } = data.get('age');

      // Getting User sex data
      const { properties: { sex } } = data.get('sex');

      const result = { memberSince, name, username, city, age, sex };

      console.log('5) [UserController.js/getUser] Sending User data: ', result);
      res.json(result);
    });
  },
};
