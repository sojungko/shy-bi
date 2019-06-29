const debug = require('debug');

const db = require('../db/config');
const { validateBirthday } = require('../utils/validate');

let log = debug('server:bio:model').bind(this);
let err = debug('server:bio:model:error').bind(this);

module.exports = {
  postBio({ name = '', email, edLevel = '', aboutMe = '', username, birthday = {}, sex = '' }, callback) {
    // log = log.extend('postBio');
    log(`Accessing user database with username: ${username}`);
    return db
      .run(
        `MATCH (user:User {username: {username}})
        SET
        user.name = {name},
        user.email = {email},
        ${validateBirthday(birthday) ? 'user.birthday = date({birthday}),' : ''}
        user.edLevel = {edLevel},
        user.aboutMe = {aboutMe},
        user.sex = {sex}`,
        { name, email, edLevel, birthday, aboutMe, username, sex },
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
