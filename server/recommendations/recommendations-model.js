/* ------------* server/recommendations/recommendations-model.js *-----------
* methods:
*
*  1) getRecMatches:
*
*
*/
const debug = require('debug');

const db = require('../db/config');

let log = debug('server:rec:model').bind(this);
let err = debug('server:rec:model:error').bind(this);

module.exports = {
    /* ------------------------- * getRecMatches * ------------
   *
   * Takes the name of the currently logged in user and fetches
   * all recommended matches from the database.  'Recommended' matches
   * are generated by querying the DB for potential matches and returning
   * users who were liked by a friend separated by 1 degree.
   *
   *  Parameters:
   *    • username | String |
   *    • callback | Function | Exectued on the result of db query.
   *
   *  Returns:
   *    • the resulting db query which resolves into a promise that
   *        executes the callback.
   *
   * --------------------------------------------------------------- */

  getRecMatches({ username }, callback) {
    // log = log.extend('getRecMatches');
    log('Accessing user database');

    return db
      .run(
        `MATCH (me:User{username: {username}})
        MATCH (me)-[:LIKES]->(a:User)<-[:LIKES]-(b:User)-[:LIKES]->(recUsers:User)
        RETURN DISTINCT recUsers LIMIT 20`,
        { username })
      .then(({ records }) => {
        db.close();

        log(`Fetching the recommended matches for username: ${username}`);
        return callback(records);
      })
      .catch((error) => {
        err(`Could not find any
        recommendations for username: ${username}`);
        throw error;
      });
  },
};
