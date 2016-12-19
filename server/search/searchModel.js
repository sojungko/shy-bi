/* ---------------- * SERVER/SEARCH/SEARCHMODEL.JS * ----------------
 *
 * This file contains methods that interact with Neo4J API.
 *
 * Methods in this file are:
 *
 * --------------------------------------------------------------- */
const db = require('../database/config');

module.exports = {
  //
  /* ------------------------- * GET ALL * -------------------------
   *
   * creates a new User node with name, username, email as its property
   *
   *  Parameters:
   *    • name | String
   *    • username | String
   *    • email | String
   *    • callback | Function | Exectued on the result of db query.
   *
   *  Returns:
   *    • the result db query which resolves into a promise that
   *        executes the callback.
   *
   * --------------------------------------------------------------- */

  getAll(callback) {
    console.log('2) [searchModel.js/getAll] Accessing user database');

    return db
      .run(
        `MATCH (age:Age)<-[:YEARS_OLD]-(user:User)-[:LIVES_IN]->(city:City)
        RETURN age, user, city LIMIT 10`
      )
      .then(({ records }) => {
        db.close();
        console.log('3) [searchModel.js/getAll] Reteriving first 10 user data');
        return callback(records);
      })
      .catch((error) => {
        console.error(`3) [userModel.js/addUser] Could not add ${username} to the database`);
        throw error;
      });
  },
};
