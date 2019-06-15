const debug = process.env.NODE_ENV === 'development' ? require('debug') : () => { };

const { like, unlike } = require('./likesModel');

const log = debug('server:likes:controller');

module.exports = {
  likeUser({ body }, res) {
    log(`[likeUser] ${body.username} is liking ${body.likedUser}`);
    like(body, (isMatch) => {
      log('[likeUser] Success! Sending back 201 status : ', isMatch);
      res.status(201).json(isMatch);
    });
  },

  unlikeUser({ body }, res) {
    log(`[unlikeUser] ${body.username} is unliking ${body.unlikedUser}`);
    unlike(body, (data) => {
      log(`[unlikeUser] ${data}`);
      res.sendStatus(201);
    });
  },
};

