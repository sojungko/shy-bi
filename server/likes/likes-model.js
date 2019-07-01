import debug from 'debug';

import db from '../db/config';

let log = debug('server:likes:model');
let err = debug('server:likes:model:error');

export function like({ username, likedUser }, callback) {
  // log = log.extend('like');
  log(`Finding ${username} and ${likedUser} from database`);

  return db
    .run(
      // `MATCH (user:User{username: {username}})
      // MATCH (liked:User{username: {likedUser}})
      // MERGE (user)-[:LIKES]->(liked)

      // MATCH (me:User{username: {username}})
      // MATCH (me)-[r:LIKES]->(liked:User) WHERE (liked)-[:LIKES]->(me)
      // SET r.viewed = false
      // RETURN liked, CASE WHEN (liked)-[:LIKES]->(user) THEN true
      // ELSE false
      // END
      // `,
      `MATCH (user:User{username: {username}})
        MATCH (liked:User{username: {likedUser}})
        MERGE (user)-[:LIKES]->(liked)
        WITH user, liked
        MATCH (user)-[:LIKES]->(any:User)
        WITH user, liked, any.username AS likedUsers
        RETURN CASE WHEN (liked)-[:LIKES]->(user) THEN true
        ELSE false END AS isMatch, user, liked, likedUsers`,
      { username, likedUser },
    )
    .then(({ records }) => {
      db.close();

      log('records', records[0]);

      log(`${username} liked ${likedUser} <3. ${records[0].get('isMatch') ? ' They are a match!' : ' But they\'re not yet a match'}`);
      callback(records[0]);
    })
    .catch((error) => {
      err(`Could not make ${username} to like ${likedUser}`);
      throw error;
    });
}

export function unlike({ username, unlikedUser }, callback) {
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
}
