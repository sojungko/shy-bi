const db = require('../database/config');

module.exports = {

  postBio() {

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
