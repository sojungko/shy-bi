/* ---------------- * SERVER/MESSAGES/MESSAGESMODEL.JS * ----------------
 *
 * This file contains methods that interact with Neo4J API.
 *
 * Methods in this file are:
 *
 *  1) GET ALL : getAll({ username }, callback)
 * --------------------------------------------------------------- */
const db = require('../database/config');

module.exports = {
  //
  /* ------------------------- * GET ALL * -------------------------
   *
   * Get all users from the database
   *
   *  Parameters:
   *    • params | Object | request.params object
   *        - destuctured to pluck username.
   *    • callback | Function | Exectued on the result of db query.
   *
   *  Returns:
   *    • the result db query which resolves into a promise that
   *        executes the callback.
   *
   * --------------------------------------------------------------- */

  getAll({ username }, callback) {
    console.log('2) [messagesModel.js/getAll] Accessing message database');

    return db
      .run(
        `MATCH (user:User {username: {username}})-[:RECEIVES]->(msgs:Messages)<-[:SENDS]-(sender:User)
        RETURN user, sender, msgs LIMIT 10`,
        { username }
      )
      .then(({ records }) => {
        db.close();
        console.log('3) [messagesModel.js/getAll] Reteriving first 10 messsages: ', records);
        return callback(records);
      })
      .catch((error) => {
        console.error('3) [messagesModel.js/getAll] Could not execute the query to the database');
        throw error;
      });
  },
};
