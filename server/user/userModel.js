/* ------------------- * SERVER/USER/USERMODEL.JS * -----------------
 *
 * This file contains methods that interact with Neo4J API.
 *
 * Methods in this file are:
 *
 *  1) ADD USER : addUser
 *
 * --------------------------------------------------------------- */

const db = require('../database/config');

module.exports = {
  //
  /* ------------------------- * ADD USER * -------------------------
   *
   *   - creates a new User node with name, username, email as its property
   *
   *    Parameters:
   *      • name | String
   *      • username | String
   *      • email | String
   *      • callback | Function | Exectued on the result of db query.
   *
   *    Returns:
   *      - result of callback.
   *
   * --------------------------------------------------------------- */

  addUser(name, username, email, callback) {
    console.log(`2) [userModel.js/addUser] Adding user ${name}
    username: ${username}
    email: ${email}
    to database`);

    return db.run(
      'MERGE (newUser:User {name: {name}, username: {username}, email: {email}}) RETURN newUser',
      { name, username, email }
    )
      .then((result) => {
        db.close();
        console.log(`3) [userModel.js/addUser] ${username} has been added`);
        return callback();
      })
      .catch((error) => {
        console.error(`3) [userModel.js/addUser] Could not add ${username} to the database`);
        throw error;
      });
  },
};
