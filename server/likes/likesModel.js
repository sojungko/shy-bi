const db = require('../database/config');

module.exports = {
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
