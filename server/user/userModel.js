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
      to database`
    );

    bcrypt.hash(password, null, null, ((err, hash) => {
      if (err) {
        console.log(`2) [userModel.js/addUser] Error hashing ${password}`);
      } else {
        console.log(`2) [userModel.js/addUser] Password successfully hashed: ${hash}`)
        console.log(`2) username : `, { username });
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
          { name, username, email, hash, job, edLevel, city, birthday, sex }
        )
        .then((user) => {
          db.close();
          console.log(`3) [userModel.js/addUser] user : `, user);
          console.log(`3) [userModel.js/addUser] user has been added`);
          return callback(user);
        })
        .catch((error) => {
          console.error(`3) [userModel.js/addUser] Could not add ${username} to the database`);
          throw error;
        });
      }
    }))

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
      { username }
    )
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
        { email }
      )
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

  like({ username, likedUser }, callback) {
    console.log(`2) [userModel.js/like] Finding ${username} and ${likedUser} from database`);

    return db
      .run(
        `MATCH (user:User{username: {username}})
        MATCH (liked:User{username: {likedUser}})
        MERGE (user)-[:LIKES]->(liked)
        RETURN user, liked`,
      { username, likedUser }
    )
      .then(({ records }) => {
        db.close();

        console.log(`3) [userModel.js/like] ${username} liked ${likedUser} <3`);
        callback(records);
      })
      .catch((error) => {
        console.error(`3) [userModel.js/like] Could not make ${username} to like ${likedUser}`);
        throw error;
      });
  },
  unlike({ username, unlikedUser }, callback) {
    console.log(`2) [userModel.js/unlike] Finding ${username} and ${unlikedUser} from database`);

    return db
      .run(
        `MATCH (user:User{username: {username}})
        MATCH (unliked:User{username: {unlikedUser}})
        MATCH (user)-[likes:LIKES]->(unliked)
        DELETE likes`,
        { username, unlikedUser }
      )
      .then((results) => {
        db.close();
        console.log(`3) [userModel.js/unlike] ${username} unliked ${unlikedUser} <3`, results);
        callback(results);
      })
      .catch((error) => {
        console.error(`3) [userModel.js/unlike] Could not make ${username} to unlike ${unlikedUser}`);
        callback(error);
      });
  },
};
