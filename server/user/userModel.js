/* ------------------- * SERVER/USER/USERMODEL.JS * -----------------
 *
 * This file contains methods that interact with Neo4J API.
 *
 * Methods in this file are:
 *
 *  1) ADD USER : addUser(name, username, email, password, city, age, sex, callback)
 *  2) GET USER : getUser({ username }, callback)
 *
 * --------------------------------------------------------------- */

const db = require('../database/config');
const bcrypt = require('bcrypt-nodejs');

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
   *    • password | String
   *    • city | String
   *    • age | Interger
   *    • sex | String
   *    • callback | Function | Exectued on the result of db query.
   *
   *  Returns:
   *    • the result db query which resolves into a promise that
   *        executes the callback.
   *
   * --------------------------------------------------------------- */

  addUser(userData, callback) {
    const { name, username, email, password, job, edLevel, city, age, sex } = userData;
    console.log(`2) [userModel.js/addUser] Adding user ${name}
      username: ${username}
      email: ${email}
      password: ${password}
      job: ${job}
      edLevel: ${edLevel}
      city: ${city}
      age: ${age}
      sex: ${sex}
      to database`);

    bcrypt.hash(password, null, null, ((err, hash) => {
      if (err) {
        console.log(`2) [userModel.js/addUser] Error hashing ${password}`);
      } else {
        console.log(`2) [userModel.js/addUser] Password successfully hashed: ${hash}`);
        console.log('2) username : ', { username });
        return db
        .run(
          `MERGE (newUser:User {
            name: {name},
            username: {username},
            email: {email},
            password: {hash},
            job: {job},
            edLevl: {edLevel}
          })
          ON CREATE SET newUser.memberSince = timestamp()

          MERGE (userCity: City {name: {city}})
          MERGE (userAge: Age {age: {age}})
          MERGE (userSex: Sex {sex: {sex}})

          MERGE (newUser)-[:LIVES_IN]->(userCity)
          MERGE (newUser)-[:YEARS_OLD]->(userAge)
          MERGE (newUser)-[:MEMBER_OF]->(userSex)

          RETURN newUser`,
          { name, username, email, hash, job, edLevel, city, age, sex })
        .then((user) => {
          db.close();
          console.log('3) [userModel.js/addUser] user : ', user);
          console.log('3) [userModel.js/addUser] user has been added');
          return callback(user);
        })
        .catch((error) => {
          console.error(`3) [userModel.js/addUser] Could not add ${username} to the database`);
          throw error;
        });
      }
    }));
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
        `MATCH (user:User{username: {username}})
        MATCH (user)-[]->(city:City)
        MATCH (user)-[]->(age:Age)
        MATCH (user)-[]->(sex:Sex)
        RETURN age, user, city, sex`,
      { username })
      .then(({ records }) => {
        db.close();

        console.log(`3) [userModel.js/getUser] ${username} has been found`);
        callback(records[0]);
      })
      .catch((error) => {
        console.error(`3) [userModel.js/getUser] Could not find ${username} from database`);
        throw error;
      });
  },

  getUserByEmail(email, callback) {
    console.log(`2) [userModel.js/getUserByEmail] Finding ${email} from database`);

    return db
      .run(
        `MATCH (user:User{email: {email}})
        RETURN user`,
        { email })
      .then(({ records }) => {
        db.close();
        console.log(`3) [userModel.js/getUserByEmail] ${email} has been found`, records);
        return callback(records);
      })
      .catch((error) => {
        console.log(`3) [userModel.js/getUserByEmail] Could not find ${email} from database`);
        throw error;
      });
  },

  toggleOnline(username) {
    console.log(`[userModel.js/toggleOnline] Toggling ${username} online `);
    return db
      .run(
        `MATCH (user: User{username: {username}})
        SET user.online = true
        RETURN user`,
        { username })
      .then((data) => {
        db.close();
        console.log(`[userModel.js/toggleOnline] Toggled ${username} online`, data);
      });
  },

  toggleOffline(username, callback) {
    console.log(`[userModel.js/toggleOffline] Toggling ${username} online `);
    return db
      .run(
        `MATCH (user: User{username: {username}})
        SET user.online = false
        RETURN user`,
        { username })
      .then((data) => {
        db.close();
        console.log(`[userModel.js/toggleOffline] Toggled ${username} offline`, data);
        return callback(data);
      });
  },
};
