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

import debug from 'debug';
import bcrypt from 'bcryptjs';
import { addUser, getUser, toggleOnline, toggleOffline } from './user-model';

let log = debug('server:user:controller');
// Plucks addUser methods from user/user-model.js

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
export function signUp({ body: { username, email, password } }, callback) {
  // log = log.extend('signup');
  log(`Signing up ${username}`);
  getUser(username, user => {
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
}
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
export function signIn({ body }, callback) {
  // log = log.extend('signIn');
  const attemptedPassword = body.password;
  const attemptedUsername = body.username;

  log(`Authenticating for user with
  username: ${attemptedUsername}, password: ${attemptedPassword}`);

  getUser(attemptedUsername, foundUser => {
    log(`Success!
      Checking attempted password: ${attemptedPassword} against database`);

    const { password, ...rest } = foundUser;
    bcrypt.compare(attemptedPassword, password, (err, isMatch) => {
      if (err) {
        log('Wrong password!');
        callback(err);
      } else if (isMatch) {
        log('Sending User data: ', rest);
        callback(null, rest);
        toggleOnline(foundUser.username);
      }
    });
  });
}

export function signOut({ body: { username } }, res) {
  // log = log.extend('signOut');
  log(`Deauthenticating username: ${username}`);
  toggleOffline(username, data => {
    log('Success!', data);
    return res.send(data);
  });
}

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
export function findUser({ params: { username } }, res) {
  // log = log.extend('findUser');
  log(`Searching for user with username: ${username}`);

  getUser(username, (data, error) => {
    if (error) {
      log('Error!', error);
      res.status(404).send(error);
    } else {
      const { password, ...rest } = data;
      log('Success! Chunking data & building res object', rest);

      log('Sending User data: ', rest);
      res.json(rest);
    }
  });
}
