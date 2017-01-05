const { postImage } = require('./bioModel');

module.exports = {
  uploadImage({ body }, res) {
    console.log(`1) [bioController.js/uploadImage] ${body.senderID} is sending image url ${body.secure_url}`);
    postImage(body, () => {
      res.status(201).end();
    });
  },
};
