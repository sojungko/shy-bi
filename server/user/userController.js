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

const jwt = require('jwt-simple');
const config = require('../auth/config');
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

  signUp({ body: { name, username, email, password, city, age, sex } }, res) {
    console.log(`1) [UserController.js/signup] Signing up ${name}`);

    addUser(name, username, email, password, city, age, sex, () => {
      const timestamp = new Date().getTime();
      const token = jwt.encode({ sub: username, iat: timestamp }, config.secret);
      const result = { name, email, username, city, age, sex, token };
      console.log('4) [UserController.js/singup] Success, sending back 201 status with token : ', token);
      res.status(201).send(result);
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

  signIn({ body }, res) {
    const attemptedPassword = body.password;
    const attemptedUsername = body.username;

    console.log(`1) [UserController.js/signIn] Authenticating for user with
    username: ${attemptedUsername}, password: ${attemptedPassword}`);

    getUser(attemptedUsername, (data) => {
      console.log(`4) [UserController.js/signIn] Success!
        Checking attempted password: ${body.password} against database`);

      // Getting User data
      const { properties: { username, memberSince, password, name, email } } = data.get('user');

      if (body.password !== password) {
        console.log('5) [UserController.js/signIn] Wrong password!', res.json);
        res.json(data);
      } else {
        // Getting User location data
        const city = data.get('city').properties.name;

        // Getting User age data
        const age = data.get('age').properties.age;

        // Getting User sex data
        const sex = data.get('sex').properties.sex;

        // Setting up token
        const timestamp = new Date().getTime();
        const token = jwt.encode({ sub: username, iat: timestamp }, config.secret);

        const result = { memberSince, password, name, email, username, city, age, sex, token };

        console.log('5) [UserController.js/signIn] Sending User data: ', result);
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
      const { properties: { memberSince, name } } = data.get('user');

      // Getting User location data
      const city = data.get('city').properties.name;

      // Getting User age data
      const age = data.get('age').properties.age;

      // Getting User sex data
      const sex = data.get('sex').properties.sex;

      const result = { memberSince, name, username, city, age, sex };

      console.log('5) [UserController.js/getUser] Sending User data: ', result);
      res.json(result);
    });
  },

  /* ------------------------- * LIKE USER * -------------------------
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

  likeUser({ body }, res) {
    console.log(`1) [UserController.js/likeUser] ${body.username} is liking ${body.likedUser}`);
    like(body, () => {
      console.log('4) [UserController.js/likeUser] Success! Sending back 201 status');
      res.sendStatus(201);
    });
  },

  unlikeUser({ body }, res) {
    console.log(`1) [UserController.js/unlikeUser] ${body.username} is unliking ${body.unlikedUser}`);
    unlike(body, (data) => {
      console.log(`4) [UserController.js/unlikeUser] ${data}`);
      res.sendStatus(201);
    });
  },
};
