import debug from 'debug';

import db from '../db/config';
import runParallel from '../queries/run';
import { mergeLikedUser, deleteLike } from '../queries/likes';
import { queryLikedUsers } from '../queries/users';

const log = debug('server:likes:model');

export async function like({ username, likedUser }, callback) {
  const local = log.extend('like');
  local(`Finding ${username} and ${likedUser} from database`);

  try {
    // don't run in parallel because liking needs to happen first
    const isMatch = await mergeLikedUser({ username, likedUser });
    const liked = await queryLikedUsers({ username });

    const result = {
      isMatch,
      liked,
    };

    log('result', result);

    return callback(result);
  } catch (error) {
    local.extend('error')(error);
    throw error;
  }
}

export async function unlike({ username, unlikedUser }, callback) {
  const local = log.extend('unlike');
  local(`Finding ${username} and ${unlikedUser} from database`);

  try {
    const deleted = await deleteLike({ username, unlikedUser });
    const liked = await queryLikedUsers({ username });

    const result = {
      deleted,
      liked,
    };

    return callback(result);
  } catch (error) {
    local.extend('error')(error);
    throw error;
  }
}
