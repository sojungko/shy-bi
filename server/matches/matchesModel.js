const debug = process.env.NODE_ENV === 'development' ? require('debug') : () => { };

const db = require('../database/config');

const log = debug('server:matches:model');

module.exports = {
  getMatchedUsers({ username }, callback) {
    log('[getMatchedUsers] Accessing user database');

    return db
    .run(
      `MATCH (me:User{username: {username}})
      MATCH (me)-[r:LIKES]->(liked:User) WHERE (liked)-[:LIKES]->(me)
      MATCH (liked)-[]->(city:City)
      MATCH (liked)-[]->(age:Age)
      MATCH (liked)-[]->(sex:Sex)
      SET r.viewed = false
      RETURN liked, age, city, sex`,
      { username })
      .then(({ records }) => {
        db.close();

        log('[getMatchedUsers] Reteriving matched users data');
        return callback(records);
      })
      .catch((error) => {
        console.error(`[userModel.js/getMatchedUsers] Could not find matched users for ${username}`);
        throw error;
      });
  },

  toggleView(username, callback) {
    log('[toggleView] Accessing user database');

    return db
      .run(
        `MATCH (user:User {username: {username}})-[r:LIKES]->(liked:User)
        WHERE (liked)-[:LIKES]->(user)
        SET r.viewed = true
        RETURN r`,
        { username },
      )
      .then(({ records }) => {
        db.close();

        log('[toggleView] Toggled view properties of matches', records);
        return callback();
      })
      .catch((error) => {
        log('[toggleView] Could not toggle view of matches');
        throw error;
      });
  },

  getNewMatches(username, callback) {
    log('[getNewMatches] Accessing user database');

    return db
      .run(
      `MATCH (user:User {username: {username}})-[r:LIKES]->(liked:User)
        WHERE (liked)-[:LIKES]->(user) AND (r.viewed = false OR r.viewed IS NULL)
        MATCH (liked)-[]->(city:City)
        MATCH (liked)-[]->(age:Age)
        MATCH (liked)-[]->(sex:Sex)
        RETURN liked, city, age, sex`,
      { username },
    )
      .then(({ records }) => {
        db.close();
        log('[getNewMatches] Successfully fetched unviewed matches : ', records);
        return callback(records);
      })
      .catch((error) => {
        log('[getNewMatches] Could not fetch unviewed matches', error);
        throw error;
      });
  },
};
