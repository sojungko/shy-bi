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
    console.log('2) [searchModel.js/getAll] Accessing user database');

    return db
      .run(
        `MATCH (user:User)
        MATCH (user)-[]->(city:City)
        MATCH (user)-[]->(age:Age)
        MATCH (user)-[]->(sex:Sex)
        RETURN age, user, city, sex LIMIT 10`
      )
      .then(({ records }) => {
        db.close();
        console.log('3) [searchModel.js/getAll] Reteriving first 10 user data');
        return callback(records);
      })
      .catch((error) => {
        console.error('3) [userModel.js/addUser] Could not execute the query to the database');
        throw error;
      });
  },

  //
  /* ------------------------- * GET MATCHES * -------------------------
   *
   * Find all user with matching relation
   *
   *  Parameters:
   *    • age | String
   *    • city | String
   *    • callback | Function | Exectued on the result of db query.
   *
   *  Returns:
   *    • the result db query which resolves into a promise that
   *        executes the callback.
   *
   * --------------------------------------------------------------- */

  getMatches(age, city, sex, callback) {
    console.log('2) [searchModel.js/getMatches] Accessing user database');

    return db
      .run(
        `MATCH (user:User)
        MATCH (user)-[:YEARS_OLD]->(Age {age: {age}})
        MATCH (user)-[:LIVES_IN]->(City {name: {city}})
        MATCH (user)-[:MEMBER_OF]->(Sex {sex: {sex}})
        RETURN user LIMIT 10`,
        { age, city, sex }
      )
      .then(({ records }) => {
        db.close();

        console.log('3) [searchModel.js/getAll] Reteriving first 10 user data that matches query');
        return callback(records);
      })
      .catch((error) => {
        console.error(`3) [userModel.js/addUser] Could not user with ${age}, ${city} in database`);
        throw error;
      });
  },
};
