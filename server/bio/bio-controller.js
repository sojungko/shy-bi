const debug = require('debug');
const { postBio, removeImage, postImage } = require('./bio-model');

let log = debug('server:bio:controller').bind(this);

module.exports = {

  editBio({ body }, res) {
    // log = log.extend('editBio');
    log('Received request :', body);
    postBio(body, () => {
      log('Completed database query', body);
      res.status(201).json(body);
    });
  },

  deleteImage(req, res) {
    // log = log.extend('deleteImage');
    log('Received request : ', req.body);
    removeImage(req.body.username, () => {
      res.sendStatus(201);
    });
  },

  uploadImage({ body: { username, url } }, res) {
    // log = log.extend('uploadImage');
    log(`Sending image url ${url} for ${username}`);
    postImage(username, url, (records) => {
      log('Image successfully saved : ', records);
      res.status(201).json(records);
    });
  },
};
