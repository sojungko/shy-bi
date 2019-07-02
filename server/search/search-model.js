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

import { queryAllUsers, queryFilteredUsers, queryLikedUsers } from '../queries/users';

const log = debug('server:search:model');
const err = debug('server:search:model:error');

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

export async function getAll(callback) {
  const local = log.extend('getAll');
  local('Accessing user database');

  try {
    const records = await queryAllUsers();
    return callback(records);
  } catch (error) {
    local.extend('error')('Could not execute the query to the database');
    throw error;
  }
}

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

export async function getFilteredUsers({ minage = 19, maxage = 100, sex }, callback) {
  const local = log.extend('getFilteredUsers');
  local(`Accessing user database
      age: ${minage} < age < ${maxage}
      sex: ${sex}
    `);

  try {
    const records = await queryFilteredUsers({ minage, maxage, sex });

    local(`Reteriving first 10 user data that matches
    minage: ${minage}, maxage: ${maxage} sex: ${sex}`);
    local('records', records);

    return callback(records);
  } catch (error) {
    local.extend('error')(error);
    throw error;
  }
}

export async function getLikedUsers({ username }, callback) {
  const local = log.extend('getLikedUsers');
  local('Accessing user database');

  try {
    const records = await queryLikedUsers({ username, usernameOnly: false });

    log('Reteriving liked users data');
    return callback(records);
  } catch (error) {
    local.extend('error')(error);
    throw error;
  }
}
