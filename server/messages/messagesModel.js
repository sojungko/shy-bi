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
        `MATCH
          (user:User {username: {username}})-[:RECEIVES]->(msgs:Messages)<-[:SENDS]-(sender:User)
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

  //
  /* ------------------------- * POST MESSAGE * -------------------------
   *
   * Store a message sent by user to the database
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

  postMessage(senderID, receiverId, title, body, callback) {
    console.log('2) [messagesModel.js/postMessage] Accessing message database');

    return db
     .run(
      `MATCH(receiver:User {username:{senderID}})
      MATCH(sender:User {username:{receiverId}})
      MERGE(msg:Messages {title:{title}, body:{body}})
      	ON CREATE SET msg.created=timestamp()
      MERGE(sender)-[:SENDS]->(msg)<-[:RECEIVES]-(receiver)
      RETURN receiver, sender, msg`,
       { senderID, receiverId, title, body }
     )
     .then((data) => {
        db.close();
        console.log('3) [messagesModel.js/postMessage] Writing message to database: ', data);
        return callback(data);
      })
     .catch((error) => {
        console.error('3) [messagesModel.js/postMessage] Could not writing message to database');
        throw error;
      });
  },
};
