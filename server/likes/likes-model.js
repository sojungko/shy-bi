const debug = require('debug');

const db = require('../db/config');

let log = debug('server:likes:model').bind(this);
let err = debug('server:likes:model:error').bind(this);

module.exports = {
  like({ username, likedUser }, callback) {
    // log = log.extend('like');
    log(`Finding ${username} and ${likedUser} from database`);

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

        log(`${username} liked ${likedUser} <3 : `, isMatch);
        callback(isMatch);
      })
      .catch((error) => {
        err(`Could not make ${username} to like ${likedUser}`);
        throw error;
      });
  },

  unlike({ username, unlikedUser }, callback) {
    // log = log.extend('unlike');
    log(`Finding ${username} and ${unlikedUser} from database`);

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
        log(`${username} unliked ${unlikedUser} <3`, results);
        callback(results);
      })
      .catch((error) => {
        err(`[user-model.js/unlike] Could not make ${username} to unlike ${unlikedUser}`);
        callback(error);
      });
  },
};
