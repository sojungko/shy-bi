/* ---------------- * SERVER/USER/USERCONTROLLER.JS * ---------------
 *
 * This file contains all user methods and serves as an intermediary
 * layer between routes.js and user-model.js. Methods in this file are
 * responsible for invoking methods in the user-model.js
 *
 * Methods in this file are:
 *
 *  1) SIGN UP : signUp({ body: { name, username, email } }, res)
 *  2) SIGN IN : singIn({ body }, res)
 *  3) FIND USER : findUser({ params: { username } }, res)
 *
 * --------------------------------------------------------------- */

const debug = require('debug');
const bcrypt = require('bcryptjs');
const { intsToNumbers } = require('../utils/convert');

let log = debug('server:user:controller').bind(this);
// Plucks addUser methods from user/user-model.js
const { addUser, getUser, toggleOnline, toggleOffline } = require('./user-model');

module.exports = {
  //
  /* -------------------------- * SIGN UP * -------------------------
   *
   * Calls addUser method. (see user/user-model.js)
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
  signUp({ body: { username, email, password } }, callback) {
    // log = log.extend('signup');
    log(`Signing up ${username}`);
    getUser(username, (user) => {
      if (user) {
        callback(null);
      } else {
        const userData = { username, email, password };
        addUser(userData, () => {
          callback(userData);
          toggleOnline(username);
        });
      }
    });
  },

  //
  /* -------------------------- * SIGN IN * -------------------------
   *
   * Calls getUser method. (see user/user-model.js)
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
    // log = log.extend('signIn');
    const attemptedPassword = body.password;
    const attemptedUsername = body.username;

    log(`Authenticating for user with
    username: ${attemptedUsername}, password: ${attemptedPassword}`);

    getUser(attemptedUsername, (data) => {
      log(`Success!
        Checking attempted password: ${body.password} against database`);

      const { properties = {} } = data.get('user');
      const {
        email,
        image_url,
        memberSince,
        name,
        password,
        username,
      } = properties;

      bcrypt.compare(body.password, password, (err, isMatch) => {
        if (err) {
          log('Wrong password!');
          callback(err);
        } else if (isMatch) {
          const result = { memberSince, password, name, email, username, image_url };

          log('Sending User data: ', result);
          callback(null, result);
          toggleOnline(username);
        }
      });
    });
  },

  signOut({ body: { username } }, res) {
    // log = log.extend('signOut');
    log(`Deauthenticating username: ${username}`);
    toggleOffline(username, (data) => {
      log('Success!', data);
      return res.send(data);
    });
  },
  /* ------------------------- * FIND USER * -------------------------
   *
   * Calls getUser method. (see user/user-model.js)
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
    // log = log.extend('findUser');
    log(`Searching for user with username: ${username}`);

    getUser(username, (data, error) => {
      if (error) {
        log('Error!', error);
        res.status(404).send(error);
      } else {
        log('Success! Chunking data & building res object', data);
        const { properties: userProps = {} } = data.get('user');
        const age = Math.floor(intsToNumbers(data.get('age')).months / 12);
        const liked = data.get('liked');

        const result = {
          ...userProps,
          age,
          birthday: intsToNumbers(userProps.birthday),
          memberSince: intsToNumbers(userProps.memberSince),
          liked: liked ? (Array.isArray(liked) ? liked.properties : [liked.properties]) : [],
        };

        log('Sending User data: ', result);
        res.json(result);
      }
    });
  },
};
