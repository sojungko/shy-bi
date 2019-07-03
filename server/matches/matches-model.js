import debug from 'debug';

import {
  queryMatchedUsers,
  setAllMatchesAsViewed,
  queryNewMatches,
} from '../queries/matches';

const log = debug('server:matches:model');

export async function getMatchedUsers({ username }, callback) {
  const local = log.extend('getMatchedUsers');
  local('Accessing user database');

  try {
    const records = await queryMatchedUsers({ username });
    return callback(records);
  } catch (error) {
    local.extend('error')(error);
    throw error;
  }
}

export async function toggleView(username, callback) {
  const local = log.extend('toggleView');

  try {
    await setAllMatchesAsViewed({ username });

    return callback();
  } catch (error) {
    local.extend('error')(error);
    throw error;
  }
}

export async function getNewMatches(username, callback) {
  const local = log.extend('getNewMatches');

  try {
    const records = await queryNewMatches({ username });
    return callback(records);
  } catch (error) {
    local.extend('error')(error);
    throw (error);
  }
}

