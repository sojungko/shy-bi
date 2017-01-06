const db = require('../database/config');

module.exports = {

  postBio({ memberSince, password, name, email, username, city, age, sex, image_url }, callback) {
    console.log(`2) [bioModel.js/postBio] Accessing user database with username: ${username}`);
    return db
      .run(
        `MATCH (n:User{ username: {username}})
        SET n = {body}
        RETURN n`,
        { memberSince, password, name, email, username, city, age, sex, image_url }
      )
      .then(({ records }) => {
        console.log('3) [bioModel.js/postBio] Editing user info in database:', records);
        db.close();
        return callback(records);
      })
      .catch((error) => {
        console.log('3) [bioModel.js/postBio] Could not edit user in database : ', error);
        throw error;
      });
  },

  postImage(username, url, callback) {
    console.log(`2) [bioModel.js/postImage] Accessing user database with url: ${url}`);
    return db
     .run(
      `MATCH (user:User{ username: {username} })
      SET user.image_url = {url}
      RETURN user`,
      { username, url }
     )
     .then(({ records }) => {
       db.close();
       console.log('3) [bioModel.js/postImage] Saving image to database:');
       return callback(records);
     })
     .catch((error) => {
       console.error('3) [bioModel.js/postImage] Could not save image to database');
       throw error;
     });
  },
};
