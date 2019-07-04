import debug from 'debug';

import { getMatchedUsers, toggleView, getNewMatches } from './matches-model';

const log = debug('server:matches:controller');

export function getMatches({ params }, res) {
  const local = log.extend('getMatches');
  local('Received request for ', params.username);
  getMatchedUsers(params, matches => {
    local('Sending matches!', matches);
    res.json(matches);
  });
}

export function viewMatch({ body: { username } }, res) {
  const local = log.extend('viewMatch');
  local(`Received request for ${username}`);
  toggleView(username, () => res.sendStatus(201));
}

export function findNewMatches({ params }, res) {
  const local = log.extend('findNewMatches');
  local(`Received request for ${params.username}`);
  getNewMatches(params.username, newMatches => res.json(newMatches));
}
