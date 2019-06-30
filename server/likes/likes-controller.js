const debug = require('debug');

const { like, unlike } = require('./likes-model');

let log = debug('server:likes:controller').bind(this);

module.exports = {
  likeUser({ body }, res) {
    // log = log.extend('likeUser');
    log(`${body.username} is liking ${body.likedUser}`);
    like(body, (data) => {
      const isMatch = data.get('isMatch');
      const allLiked = data.get('any'); // TODO process this data

      const result = {
        isMatch,
        allLiked: allLiked ? Array.isArray(allLiked) ? allLiked : [allLiked] : null,
      };
      log(`[likeUser] Success! Sending back 201 status. ${isMatch ? 'They are a match!' : 'They\'re not yet a match.'}`);
      res.status(201).json(result);
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

