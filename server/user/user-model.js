/* ------------------- * SERVER/USER/USERMODEL.JS * -----------------
 *
 * This file contains methods that interact with Neo4J API.
 *
 * Methods in this file are:
 *
 *  1) ADD USER : addUser(name, username, email, password, city, age, sex, callback)
 *  2) GET USER : getUser({ username }, callback)
 *
 * --------------------------------------------------------------- */

import bcrypt from 'bcryptjs';
import debug from 'debug';
import db from '../db/config';

import runParallel from '../queries/run';
import { mergeUser, queryUser, queryBirthday } from '../queries/users';
import { queryLikedUsers } from '../queries/likes';

const log = debug('server:user:model');

//
/* ------------------------- * ADD USER * -------------------------
 *
 * creates a new User node with name, username, email as its property
 *
 *  Parameters:
 *    • username | String
 *    • email | String
 *    • password | String
 *    • callback | Function | Exectued on the result of db query.
 *
 *  Returns:
 *    • the result db query which resolves into a promise that
 *        executes the callback.
 *
 * --------------------------------------------------------------- */
export function addUser(userData, callback) {
  const { username, password, email } = userData;
  const local = log.extend('addUser');
  const err = local.extend('error');
  local(`Adding user
    username: ${username}
    password: ${password}
    email: ${email}
    to database`);

  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      err('Error generating hash');
    } else {
      bcrypt.hash(password, salt, async (error, hash) => {
        if (error) {
          err(`Error hashing ${password}`);
        } else {
          local(`Password successfully hashed: ${hash}`);
          local('username : ', { username });
          try {
            const newUser = await mergeUser({ username, email, hash });
            return callback(newUser);
          } catch (error) {
            err(`Could not add ${username} to the database`);
            throw error;
          }
        }
      });
    }
  });
}

/* ------------------------- * GET USER * -------------------------
 *
 * Find a User with matching username
 *
 *  Parameters:
 *    • username | String
 *    • callback | Function | Exectued on the result of db query.
 *
 *  Returns:
 *    • the result db query which resolves into a promise that
 *        executes the callback.
 *
 * --------------------------------------------------------------- */

export async function getUser(username, callback) {
  const local = log.extend('getUser');
  local(`Finding ${username} from database`);

  try {
    const records = await runParallel({
      user: queryUser({ username }),
      liked: queryLikedUsers({ username }),
      ageInMonths: queryBirthday({ username }),
    });

    local('records', records);
    const { user, liked, ageInMonths } = records;

    /* -- Consolidate into one user obj -- */
    const userObj = {
      ...user,
      liked,
      age: Math.floor(ageInMonths / 12),
    };

    callback(userObj);
  } catch (error) {
    local.extend('error')(error);
  }
}

export function toggleOnline(username) {
  const local = log.extend('toggleOnline');
  local(`Toggling ${username} online `);
  return db
    .run(
      `MATCH (user: User{username: {username}})
      SET user.online = true
      RETURN user`,
      { username }
    )
    .then(data => {
      db.close();
      local(`Toggled ${username} online`, data);
    });
}

export function toggleOffline(username, callback) {
  const local = log.extend('toggleOffline');
  local(`Toggling ${username} online `);
  return db
    .run(
      `MATCH (user: User{username: {username}})
      SET user.online = false
      RETURN user`,
      { username }
    )
    .then(data => {
      db.close();
      local(`Toggled ${username} offline`, data);
      return callback(data);
    });
}
