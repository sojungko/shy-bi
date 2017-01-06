const { postBio, postImage } = require('./bioModel');

module.exports = {

  editBio({ body }, res) {
    console.log(`1) [bioController.js/editBio] Received request :`, body);
    postBio(body, () => {
      console.log()
      res.end();
    });
  },

  uploadImage({ body: { username, url } }, res) {
    console.log(`1) [bioController.js/uploadImage] Sending image url ${url} for ${username}`);
    postImage(username, url, (records) => {
      console.log('Image successfully saved : ', records);
      res.status(201).end();
    });
  },
};
