import debug from 'debug';

import { getRecMatches } from './recommendations-model';

const log = debug('server:rec:controller');

export function getRecommendedMatches({ params }, res) {
  const local = log.extend('getRecommendedMatches');
  local(`Getting recommended matches for ${params.username}`);
  getRecMatches(params, recs => {
    local('Success! Building res object');

    local('Sending potential matches!', recs);
    res.json(recs);
  });
}
