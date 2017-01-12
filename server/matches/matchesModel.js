const db = require('../database/config');

module.exports = {
  getMatchedUsers({ username }, callback) {
    console.log('2) [matchesModel.js/getMatchedUsers] Accessing user database');

    return db
    .run(
      `MATCH (me:User{username: {username}})
      MATCH (me)-[:LIKES]->(liked:User) WHERE (liked)-[:LIKES]->(me)
      MATCH (liked)-[]->(city:City)
      MATCH (liked)-[]->(age:Age)
      MATCH (liked)-[]->(sex:Sex)
      RETURN liked, age, city, sex`,
      { username })
      .then(({ records }) => {
        db.close();

        console.log('3) [matchesModel.js/getMatchedUsers] Reteriving matched users data');
        return callback(records);
      })
      .catch((error) => {
        console.error(`3) [userModel.js/getMatchedUsers] Could not find matched users for ${username}`);
        throw error;
      });
  },

  toggleView(username, callback) {
    console.log('2) [matchesModel.js/toggleView] Accessing user database');

    return db
      .run(
        `MATCH (user:User {username: {username}})-[r:LIKES]->(liked:User)
        WHERE (liked)-[:LIKES]->(user)
        SET r.viewed = true`,
        { username }
      )
      .then(() => {
        db.close();

        console.log('3) [matchesModel.js/toggleView] Toggled view properties of matches');
        return callback();
      })
      .catch((error) => {
        console.log('3) [matchesModel.js/toggleView] Could not toggle view of matches');
        throw error;
      });
  },

  getNewMatches(username, callback) {
    console.log('2) [matchesModel.js/getNewMatches] Accessing user database');

    return db
      .run(
        `MATCH (user:User {username: {username}})-[r:LIKES]->(liked:User)
        WHERE (liked)-[:LIKES]->(user)
        WITH r
        MATCH r.viewed = false
        RETURN liked`,
        { username }
      )
      .then(() => {
        return callback();
      })
  }
};
