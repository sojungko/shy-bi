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

let log = debug('server:user:model').bind(this);

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
    // log = log.extend('addUser');
    log(`Adding user
      username: ${username}
      password: ${password}
      email: ${email}
      to database`);

    bcrypt.hash(password, null, null, ((err, hash) => {
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
          ON CREATE SET newUser.memberSince = timestamp()

          RETURN newUser`,
          { username, email, hash })
        .then(({ records }) => {
          db.close();
          log('records : ', records);
          log('user has been added');
          return callback(records[0]);
        })
        .catch((error) => {
          console.error(`Could not add ${username} to the database`);
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
    // log = log.extend('getUser');
    log(`Finding ${username} from database`);

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

        log(`${username} has been found`);
        log(records);
        callback(records[0]);
      })
      .catch((error) => {
        console.error(`Could not find ${username} from database`);
        throw error;
      });
  },

  getUserByEmail(email, callback) {
    // log = log.extend('getUserByEmail');
    log(`Finding ${email} from database`);

    return db
      .run(
        `MATCH (user:User{email: {email}})
        RETURN user`,
        { email })
      .then(({ records }) => {
        db.close();
        log(`${email} has been found`, records);
        return callback(records);
      })
      .catch((error) => {
        console.log(`Could not find ${email} from database`);
        throw error;
      });
  },

  toggleOnline(username) {
    // log = log.extend('toggleOnline');
    log(`Toggling ${username} online `);
    return db
      .run(
        `MATCH (user: User{username: {username}})
        SET user.online = true
        RETURN user`,
        { username })
      .then((data) => {
        db.close();
        log(`Toggled ${username} online`, data);
      });
  },

  toggleOffline(username, callback) {
    // log = log.extend('toggleOffline');
    log(`Toggling ${username} online `);
    return db
      .run(
        `MATCH (user: User{username: {username}})
        SET user.online = false
        RETURN user`,
        { username })
      .then((data) => {
        db.close();
        console.log(`Toggled ${username} offline`, data);
        return callback(data);
      });
  },
};
