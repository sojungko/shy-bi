const debug = require('debug');

const db = require('../db/config');

const log = debug('server:likes:model');

module.exports = {
  like({ username, likedUser }, callback) {
    log(`[like] Finding ${username} and ${likedUser} from database`);

    return db
      .run(
        `MATCH (user:User{username: {username}})
        MATCH (liked:User{username: {likedUser}})
        MERGE (user)-[:LIKES]->(liked)

        RETURN CASE WHEN (liked)-[:LIKES]->(user) THEN true
        ELSE false
        END`,
      { username, likedUser },
    )
      .then(({ records }) => {
        db.close();
        const isMatch = records[0]._fields[0];

        log(`[like] ${username} liked ${likedUser} <3 : `, isMatch);
        callback(isMatch);
      })
      .catch((error) => {
        console.error(`[like] Could not make ${username} to like ${likedUser}`);
        throw error;
      });
  },

  unlike({ username, unlikedUser }, callback) {
    log(`[unlike] Finding ${username} and ${unlikedUser} from database`);

    return db
      .run(
        `MATCH (user:User{username: {username}})
        MATCH (unliked:User{username: {unlikedUser}})
        MATCH (user)-[likes:LIKES]->(unliked)
        DELETE likes`,
        { username, unlikedUser },
      )
      .then((results) => {
        db.close();
        log(`[unlike] ${username} unliked ${unlikedUser} <3`, results);
        callback(results);
      })
      .catch((error) => {
        console.error(`[user-model.js/unlike] Could not make ${username} to unlike ${unlikedUser}`);
        callback(error);
      });
  },
};
