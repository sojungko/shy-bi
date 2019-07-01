const debug = require('debug');
const { postBio, removeImage, postImage } = require('./bio-model');
const { intsToNumbers } = require('../utils/convert');

let log = debug('server:bio:controller');

module.exports = {

  editBio({ body }, res) {
    // log = log.extend('editBio');
    log('Received request :', body);
    postBio(body, (data, error) => {
      if (error) {
        log('Error!', error);
        res.status(500).send(error);
      }
      log('Completed database query', data);
      const { properties = {} } = data.get('user');
      const age = Math.floor(intsToNumbers(data.get('age')).months / 12);
      const {
        aboutMe,
        birthday,
        edLevel,
        email,
        image_url,
        job,
        memberSince,
        name,
        online,
        sex,
        username,
      } = properties;

      const result = {
        aboutMe,
        age,
        birthday: intsToNumbers(birthday),
        edLevel,
        email,
        image_url,
        job,
        memberSince: intsToNumbers(memberSince),
        name,
        online,
        sex,
        username,
      };

      log('Sending back updated user data', result);

      res.status(201).json(result);
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
      const { properties: { image_url } } = records.get('user');
      log('image_url', image_url);
      res.status(201).json(image_url);
    });
  },
};
