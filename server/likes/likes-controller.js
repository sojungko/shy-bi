import debug from 'debug';

import { like, unlike } from './likes-model';

let log = debug('server:likes:controller');

export function likeUser({ body }, res) {
  // log = log.extend('likeUser');
  log(`${body.username} is liking ${body.likedUser}`);
  like(body, (data) => {
    log('[likeUser] Success! Sending back 201 status.');
    res.status(201).json(data);
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

