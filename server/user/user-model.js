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
import { queryUser, queryBirthday } from '../queries/users';
import { queryLikedUsers } from '../queries/likes';

let log = debug('server:user:model');
let err = debug('server:user:model:error');

//
/* ------------------------- * ADD USER * -------------------------
 *
 * creates a new User node with name, username, email as its property
 *
 *  Parameters:
 *    • name | String
 *    • username | String
 *    • email | String
 *    • password | String
 *    • city | String
 *    • age | Interger
 *    • sex | String
 *    • callback | Function | Exectued on the result of db query.
 *
 *  Returns:
 *    • the result db query which resolves into a promise that
 *        executes the callback.
 *
 * --------------------------------------------------------------- */
export function addUser(userData, callback) {
  const { username, password, email } = userData;
  // log = log.extend('addUser');
  log(`Adding user
    username: ${username}
    password: ${password}
    email: ${email}
    to database`);

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      err('Error generating hash');
    } else {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          log(`Error hashing ${password}`);
        } else {
          log(`Password successfully hashed: ${hash}`);
          log('username : ', { username });
          return db
            .run(
              `MERGE (newUser:User {
              username: {username},
              password: {hash},
              email: {email}
            })
            ON CREATE SET newUser.memberSince = datetime()
  
            RETURN newUser`,
              { username, email, hash }
            )
            .then(({ records }) => {
              db.close();
              log('records : ', records);
              log('user has been added');
              return callback(records[0]);
            })
            .catch(error => {
              err(`Could not add ${username} to the database`);
              throw error;
            });
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
  log = log.extend('getUser');
  log(`Finding ${username} from database`);

  try {
    const records = await runParallel({
      user: queryUser({ username }),
      liked: queryLikedUsers({ username }),
      ageInMonths: queryBirthday({ username }),
    });

    log('records', records);
    const { user, liked, ageInMonths } = records;

    /* -- Consolidate into one user obj -- */
    const userObj = {
      ...user,
      liked,
      age: Math.floor(ageInMonths / 12),
    };

    callback(userObj);
  } catch (error) {
    err('Error', error);
  }
}

export function getUserByEmail(email, callback) {
  // log = log.extend('getUserByEmail');
  log(`Finding ${email} from database`);

  return db
    .run(
      `MATCH (user:User{email: {email}})
      UNWIND [duration.inMonths(user.birthday, date())] as age
      RETURN user, age`,
      { email }
    )
    .then(({ records }) => {
      db.close();
      log(`${email} has been found`, records);
      return callback(records);
    })
    .catch(error => {
      err(`Could not find ${email} from database`);
      throw error;
    });
}

export function toggleOnline(username) {
  // log = log.extend('toggleOnline');
  log(`Toggling ${username} online `);
  return db
    .run(
      `MATCH (user: User{username: {username}})
      SET user.online = true
      RETURN user`,
      { username }
    )
    .then(data => {
      db.close();
      log(`Toggled ${username} online`, data);
    });
}

export function toggleOffline(username, callback) {
  // log = log.extend('toggleOffline');
  log(`Toggling ${username} online `);
  return db
    .run(
      `MATCH (user: User{username: {username}})
      SET user.online = false
      RETURN user`,
      { username }
    )
    .then(data => {
      db.close();
      log(`Toggled ${username} offline`, data);
      return callback(data);
    });
}
