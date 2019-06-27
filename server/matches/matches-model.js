const debug = require('debug');

const db = require('../db/config');

let log = debug('server:matches:model').bind(this);
let err = debug('server:matches:model:error').bind(this);

module.exports = {
  getMatchedUsers({ username }, callback) {
    // log = log.extend('getMatchedUsers');
    log('Accessing user database');

    return db
    .run(
      // `MATCH (me:User{username: {username}})
      // MATCH (me)-[r:LIKES]->(liked:User) WHERE (liked)-[:LIKES]->(me)
      // MATCH (liked)-[]->(city:City)
      // MATCH (liked)-[]->(age:Age)
      // MATCH (liked)-[]->(sex:Sex)
      // SET r.viewed = false
      // RETURN liked, age, city, sex`,
      `MATCH (me:User{username: {username}})
      MATCH (me)-[r:LIKES]->(liked:User) WHERE (liked)-[:LIKES]->(me)
      MATCH (liked)-[]->(age:Age)
      MATCH (liked)-[]->(sex:Sex)
      SET r.viewed = false
      RETURN liked, age, sex`,
      { username })
      .then(({ records }) => {
        db.close();

        log('Reteriving matched users data');
        return callback(records);
      })
      .catch((error) => {
        err(`[user-model.js/getMatchedUsers] Could not find matched users for ${username}`);
        throw error;
      });
  },

  toggleView(username, callback) {
    // log = log.extend('toggleView');
    log('Accessing user database');

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

        log('Toggled view properties of matches', records);
        return callback();
      })
      .catch((error) => {
        err('Could not toggle view of matches');
        throw error;
      });
  },

  getNewMatches(username, callback) {
    // log = log.extend('getNewMatches');
    log('Accessing user database');

    return db
      .run(
      // `MATCH (user:User {username: {username}})-[r:LIKES]->(liked:User)
      //   WHERE (liked)-[:LIKES]->(user) AND (r.viewed = false OR r.viewed IS NULL)
      //   MATCH (liked)-[]->(city:City)
      //   MATCH (liked)-[]->(age:Age)
      //   MATCH (liked)-[]->(sex:Sex)
      //   RETURN liked, city, age, sex`,
      `MATCH (user:User {username: {username}})-[r:LIKES]->(liked:User)
        WHERE (liked)-[:LIKES]->(user) AND (r.viewed = false OR r.viewed IS NULL)
        MATCH (liked)-[]->(age:Age)
        MATCH (liked)-[]->(sex:Sex)
        RETURN liked, city, age, sex`,
      { username },
    )
      .then(({ records }) => {
        db.close();
        log('Successfully fetched unviewed matches : ', records);
        return callback(records);
      })
      .catch((error) => {
        err('Could not fetch unviewed matches', error);
        throw error;
      });
  },
};
