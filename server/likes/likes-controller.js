const debug = require('debug');

const { like, unlike } = require('./likes-model');

let log = debug('server:likes:controller').bind(this);

module.exports = {
  likeUser({ body }, res) {
    // log = log.extend('likeUser');
    log(`${body.username} is liking ${body.likedUser}`);
    like(body, (isMatch) => {
      log('[likeUser] Success! Sending back 201 status : ', isMatch);
      res.status(201).json(isMatch);
    });
  },

  unlikeUser({ body }, res) {
    // log = log.extend('unlikeUser');
    log(`${body.username} is unliking ${body.unlikedUser}`);
    unlike(body, (data) => {
      log(data);
      res.sendStatus(201);
    });
  },
};

