/* ------------------- * SERVER/USER/USERMODEL.JS * -----------------
 *
 * This file contains methods that interact with Neo4J API.
 *
 * Methods in this file are:
 *
 *  1) ADD USER : addUser
 *  2) GET USER : getUser
 *
 * --------------------------------------------------------------- */

const db = require('../database/config');

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
   *    • callback | Function | Exectued on the result of db query.
   *
   *  Returns:
   *    • the result db query which resolves into a promise that
   *        executes the callback.
   *
   * --------------------------------------------------------------- */

  addUser(name, username, email, password, city, age, callback) {
    console.log(`2) [userModel.js/addUser] Adding user ${name}
      username: ${username}
      email: ${email}
      password: ${password}
      city: ${city}
      age: ${age}
      to database`
    );

    return db
      .run(
        `MERGE (newUser:User {
          name: {name},
          username: {username},
          email: {email},
          password: {password}
        })
          ON CREATE SET newUser.memberSince = timestamp()

        MERGE (userCity: City {name: {city}})
        MERGE (userAge: Age {age: {age}})

        MERGE (newUser)-[:LIVES_IN]->(userCity)
        MERGE (newUser)-[:YEARS_OLD]->(userAge)`,
        { name, username, email, password, city, age }
    )
      .then(() => {
        db.close();
        console.log(`3) [userModel.js/addUser] ${username} has been added`);
        return callback();
      })
      .catch((error) => {
        console.error(`3) [userModel.js/addUser] Could not add ${username} to the database`);
        throw error;
      });
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
    console.log(`2) [userModel.js/getUser] Finding ${username} from database`);

    return db
      .run(
        `MATCH (age:Age)<-[:YEARS_OLD]-(user:User{username: {username}})-[:LIVES_IN]->(city:City)
        RETURN age, user, city`,
      { username }
    )
      .then(({ records }) => {
        db.close();
        console.log(`3) [userModel.js/getUser] ${username} has been found`);
        callback(records[0]);
      })
      .catch((error) => {
        console.error(`3) [userModel.js/addUser] Could not add ${username} to the database`);
        throw error;
      });
  },
};
