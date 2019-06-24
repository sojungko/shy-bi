const debug = require('debug');

const db = require('../db/config');

let log = debug('server:bio:model').bind(this);
let err = debug('server:bio:model:error').bind(this);

module.exports = {
  postBio({ name, email, job = '', edLevel = '', aboutMe = '', username, city, age, sex }, callback) {
    // log = log.extend('postBio');
    log(`Accessing user database with username: ${username}`);
    return db
      .run(
        `MATCH (user:User {username: {username}})
        SET user.name = {name}, user.email = {email}, user.job={job}, user.edLevel={edLevel}, user.aboutMe={aboutMe}
        WITH user
        MATCH (user)-[cityRel:LIVES_IN]->(city:City) WHERE NOT city.name = {city}
        MERGE (user)-[:LIVES_IN]->(newCity:City {name: {city}})
        DETACH DELETE cityRel
        WITH user
        MATCH (user)-[ageRel:YEARS_OLD]->(age:Age) WHERE NOT age.age = {age}
        MERGE (user)-[:YEARS_OLD]->(newAge:Age {age: {age}})
        DETACH DELETE ageRel
        WITH user
        MATCH (user)-[sexRel:MEMBER_OF]->(sex:Sex) WHERE NOT sex.sex = {sex}
        MERGE (user)-[:MEMBER_OF]->(newSex:Sex {sex: {sex}})
        DETACH DELETE sexRel`,
        { name, email, job, edLevel, aboutMe, username, city, age, sex }
      )
      .then(() => {
        log('Editing user info in database:');
        db.close();
        return callback();
      })
      .catch((error) => {
        err('Could not edit user in database : ', error);
        throw error;
      });
  },

  removeImage(username, callback) {
    // log = log.extend('removeImage');
    log(`Accessing user database with ${username}`);
    return db
      .run(
        `MATCH (user:User {username: {username}})
        REMOVE user.image_url
        RETURN user`,
        { username },
      )
      .then(({ records }) => {
        db.close();
        log('Successfully removed image url from database');
        return callback(records);
      })
      .catch((error) => {
        err('Could not delete image from database');
        throw error;
      });
  },

  postImage(username, url, callback) {
    // log = log.extend('postImage');
    log(`Accessing user database with url: ${url}`);
    return db
     .run(
      `MATCH (user:User{ username: {username} })
      SET user.image_url = {url}
      RETURN user`,
      { username, url },
     )
     .then(({ records }) => {
       db.close();
       log('Saving image to database:');
       return callback(records);
     })
     .catch((error) => {
       err('[postImage] Could not save image to database');
       throw error;
     });
  },
};