import debug from 'debug';

import { like, unlike } from './likes-model';

let log = debug('server:likes:controller');

export function likeUser({ body }, res) {
  // log = log.extend('likeUser');
  log(`${body.username} is liking ${body.likedUser}`);
  like(body, (data) => {
    const isMatch = data.get('isMatch');
    const allLiked = data.get('likedUsers'); // TODO process this data
    const liked = data.get('liked');
    log('allLiked', allLiked);
    log('liked', liked);

    const result = {
      isMatch,
      allLiked: allLiked ? Array.isArray(allLiked) ? allLiked : [allLiked] : [],
    };
    log(`[likeUser] Success! Sending back 201 status. ${isMatch ? 'They are a match!' : 'They\'re not yet a match.'}`);
    res.status(201).json(result);
  });
}

export function unlikeUser({ body }, res) {
  // log = log.extend('unlikeUser');
  log(`${body.username} is unliking ${body.unlikedUser}`);
  unlike(body, (data) => {
    log(data);
    res.sendStatus(201);
  });
}


