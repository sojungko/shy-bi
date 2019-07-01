/* ---------------- * SERVER/SEARCH/SEARCHMODEL.JS * ----------------
 *
 * This file contains methods that interact with Neo4J API.
 *
 * Methods in this file are:
 *
 *  1) GET ALL : getAll(callback)
 *  2) GET MATCHES : getFilteredUsers({ age = '^\\d.*', city = '^\\w.*', sex = '^\\w.*' }, callback)
 *
 * --------------------------------------------------------------- */
import debug from 'debug';

import db from '../db/config';

let log = debug('server:search:model');
let err = debug('server:search:model:error');

module.exports = {
  //
  /* ------------------------- * GET ALL * -------------------------
   *
   * Get all users from the database
   *
   *  Parameters:
   *    • callback | Function | Exectued on the result of db query.
   *
   *  Returns:
   *    • the result db query which resolves into a promise that
   *        executes the callback.
   *
   * --------------------------------------------------------------- */

  getAll(callback) {
    // log = log.extend('getAll');
    log('Accessing user database');

    return db
      .run(
        `MATCH (user:User)
        UNWIND [duration.inMonths(user.birthday, date())] as age
        RETURN user, age LIMIT 10`)
      .then(({ records }) => {
        db.close();
        log('Reteriving first 10 user data');
        return callback(records);
      })
      .catch((error) => {
        err('Could not execute the query to the database');
        throw error;
      });
  },

  //
  /* ------------------------- * GET MATCHES * -------------------------
   *
   * Find all user with matching relation
   *
   *  Parameters:
   *    • age | String | Default: regEx pattern
   *    • city | String | Default: regEx pattern
   *    • sex | String | Default: regEx pattern
   *    • callback | Function | Exectued on the result of db query.
   *
   *  Returns:
   *    • the result db query which resolves into a promise that
   *        executes the callback.
   *
   * --------------------------------------------------------------- */

  getFilteredUsers({ minage = 19, maxage = 100, sex }, callback) {
    // log = log.extend('getFilteredUsers');
    log(`Accessing user database
      age: ${minage} < age < ${maxage}
      sex: ${sex}
    `);

    const sexes = sex.split(',');

    return db
      .run(
        `MATCH (user:User)
        WITH user
        UNWIND [duration.inMonths(user.birthday, date())] as age
        WITH user, age
        WHERE toInt({minage}) <= floor(age.months/12) <= toInt({maxage})
        ${sex.length ? 'WITH * WHERE user.sex IN {sexes}' : ''}
        RETURN user, age LIMIT 10`,
        { minage, maxage, sexes })
      .then(({ records }) => {
        db.close();
        log('records', records);

        log(`Reteriving first 10 user data that matches
          minage: ${minage}, maxage: ${maxage} sex: ${sex}`);
        return callback(records);
      })
      .catch((error) => {
        err(`Could not user with
          ${minage}, ${maxage}, ${sex} in database`);
        throw error;
      });
  },

  getLikedUsers({ username }, callback) {
    // log = log.extend('getLikedUsers');
    log('Accessing user database');

    return db
      .run(
        `MATCH (me:User{username: {username}})
        MATCH (me)-[:LIKES]->(liked:User)
        RETURN liked`,
        { username })
      .then(({ records }) => {
        db.close();

        log('Reteriving liked users data');
        return callback(records);
      })
      .catch((error) => {
        err(`Could not find liked users for ${username}`);
        throw error;
      });
  },
};
