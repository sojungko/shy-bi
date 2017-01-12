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
        RETURN user, ID(msgs), sender, msgs ORDER BY msgs.created DESC LIMIT 10`,
        { username })
      .then(({ records }) => {
        db.close();
        console.log('3) [messagesModel.js/getAll] Reteriving first 10 messsages: ');
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
   *  Parameters: body | Object | req.body destructured to pluck:
   *    • senderID | String | sender's username
   *    • receiverId | String | receiver's username
   *    • title | String | title of the message
   *    • body | String | body of the message
   *    • callback | Function | Exectued on the result of db query.
   *
   *  Returns:
   *    • the result db query which resolves into a promise that
   *        executes the callback.
   *
   * --------------------------------------------------------------- */

  postMessage({ senderID, receiverID, title, body }, callback) {
    console.log(`2) [messagesModel.js/postMessage] Accessing message database with
      senderID: ${senderID}
      receiverID: ${receiverID}
      title: ${title}
      body: ${body}`);

    return db
     .run(
      `MATCH(sender:User {username:{senderID}})
      MATCH(receiver:User {username:{receiverID}})
      CREATE(msg:Messages {title:{title}, body:{body}, read: false, deletedBySender: false, deletedByReceiver: false, created: timestamp() })
      MERGE(sender)-[:SENDS]->(msg)<-[:RECEIVES]-(receiver)
      RETURN receiver, sender, msg`,
       { senderID, receiverID, title, body })
     .then((data) => {
       db.close();
       console.log('3) [messagesModel.js/postMessage] Writing message to database:');
       return callback(data);
     })
     .catch((error) => {
       console.error('3) [messagesModel.js/postMessage] Could not writing message to database');
       throw error;
     });
  },

  //
  /* ------------------------- * GET OUTBOX * -------------------------
   *
   * Get all messages sent by the user
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

  getOutbox({ username }, callback) {
    console.log('2) [messagesModel.js/getOutbox] Accessing message database');

    return db
      .run(
        `MATCH
          (user:User {username: {username}})-[:SENDS]->(msgs:Messages)<-[:RECEIVES]-(receiver:User)
        RETURN user, ID(msgs), receiver, msgs ORDER BY msgs.created DESC LIMIT 10`,
        { username })
      .then(({ records }) => {
        db.close();
        console.log(`3) [messagesModel.js/getOutbox] Reteriving first 10 messsages
          sent by ${username}`);
        return callback(records);
      })
      .catch((error) => {
        console.error(`3) [messagesModel.js/getOutbox]
          Could not execute the query to the database`);
        throw error;
      });
  },

  toggleRead({ msgID }, callback) {
    return db
      .run(
        `MATCH (message: Messages)
          WHERE ID(message) = {msgID}
          SET message.read = true
        RETURN message`,
        { msgID })
      .then(({ records }) => {
        db.close();
        return callback(records);
      })
      .catch((error) => {
        throw error;
      });
  },
};
