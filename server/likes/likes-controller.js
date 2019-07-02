import debug from 'debug';

import { like, unlike } from './likes-model';

const log = debug('server:likes:controller');

export function likeUser({ body }, res) {
  const local = log.extend('likeUser');
  local(`${body.username} is liking ${body.likedUser}`);
  like(body, (data) => {
    log('[likeUser] Success! Sending back 201 status.');
    res.status(201).json(data);
  });
}

export function unlikeUser({ body }, res) {
  const local = log.extend('unlikeUser');
  local(`${body.username} is unliking ${body.unlikedUser}`);
  unlike(body, (data) => {
    local(data);
    res.status(201).send(data);
  });
}

