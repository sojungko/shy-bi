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

const bcrypt = require('bcrypt-nodejs');
const debug = require('debug');
const db = require('../db/config');

const log = debug('server:user:model');

module.exports = {
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

  addUser(userData, callback) {
    const { username, password, email } = userData;
    log(`[addUser] Adding user
      username: ${username}
      password: ${password}
      email: ${email}
      to database`);

    bcrypt.hash(password, null, null, ((err, hash) => {
      if (err) {
        log(`[addUser] Error hashing ${password}`);
      } else {
        log(`[addUser] Password successfully hashed: ${hash}`);
        log('[addUser] username : ', { username });
        return db
        .run(
          `MERGE (newUser:User {
            username: {username},
            password: {hash},
            email: {email}
          })
          ON CREATE SET newUser.memberSince = timestamp()

          RETURN newUser`,
          { username, email, hash })
        .then(({ records }) => {
          db.close();
          log('[addUser] records : ', records);
          log('[addUser] user has been added');
          return callback(records[0]);
        })
        .catch((error) => {
          console.error(`[addUser] Could not add ${username} to the database`);
          throw error;
        });
      }
    }));
  },

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

  getUser(username, callback) {
    log(`[getUser] Finding ${username} from database`);

    return db
      .run(
        `MATCH (user:User{username: {username}})
        MATCH (user)-[]->(city:City)
        MATCH (user)-[]->(age:Age)
        MATCH (user)-[]->(sex:Sex)
        RETURN age, user, city, sex`,
      { username })
      .then(({ records }) => {
        db.close();

        log(`[getUser] ${username} has been found`);
        log(records);
        callback(records[0]);
      })
      .catch((error) => {
        console.error(`[getUser] Could not find ${username} from database`);
        throw error;
      });
  },

  getUserByEmail(email, callback) {
    console.log(`2) [user-model.js/getUserByEmail] Finding ${email} from database`);

    return db
      .run(
        `MATCH (user:User{email: {email}})
        RETURN user`,
        { email })
      .then(({ records }) => {
        db.close();
        console.log(`3) [user-model.js/getUserByEmail] ${email} has been found`, records);
        return callback(records);
      })
      .catch((error) => {
        console.log(`3) [user-model.js/getUserByEmail] Could not find ${email} from database`);
        throw error;
      });
  },

  toggleOnline(username) {
    log(`[toggleOnline] Toggling ${username} online `);
    return db
      .run(
        `MATCH (user: User{username: {username}})
        SET user.online = true
        RETURN user`,
        { username })
      .then((data) => {
        db.close();
        log(`[toggleOnline] Toggled ${username} online`, data);
      });
  },

  toggleOffline(username, callback) {
    log(`[toggleOffline] Toggling ${username} online `);
    return db
      .run(
        `MATCH (user: User{username: {username}})
        SET user.online = false
        RETURN user`,
        { username })
      .then((data) => {
        db.close();
        console.log(`[toggleOffline] Toggled ${username} offline`, data);
        return callback(data);
      });
  },
};
