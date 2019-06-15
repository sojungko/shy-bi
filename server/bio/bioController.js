const debug = require('debug');
const { postBio, removeImage, postImage } = require('./bioModel');

const log = debug('server:bio:controller');

module.exports = {

  editBio({ body }, res) {
    log('[editBio] Received request :', body);
    postBio(body, () => {
      log('[editBio] Completed database query', body);
      res.status(201).json(body);
    });
  },

  deleteImage(req, res) {
    log('[deleteImage] Received request : ', req.body);
    removeImage(req.body.username, () => {
      res.sendStatus(201);
    });
  },

  uploadImage({ body: { username, url } }, res) {
    log(`[uploadImage] Sending image url ${url} for ${username}`);
    postImage(username, url, (records) => {
      log('Image successfully saved : ', records);
      res.status(201).json(records);
    });
  },
};
