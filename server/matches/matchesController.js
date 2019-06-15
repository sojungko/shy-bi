const debug = process.env.NODE_ENV === 'development' ? require('debug') : () => { };

const { getMatchedUsers, toggleView, getNewMatches } = require('./matchesModel');

const log = debug('server:matches:controller');

module.exports = {

  getMatches({ params }, res) {
    log('[getMatches] Received request for ', params.username);
    getMatchedUsers(params, (matches) => {
      log('[getMatches] Completed database query for ', params.username);
      const matchedUsers = matches.map((matchedUserData, index) => {
        log(`${index}) [getMatches] parsing data`);
        // Getting User data
        const { properties: { memberSince, name, username, image_url, online } } = matchedUserData.get('liked');
        const city = matchedUserData.get('city').properties.name;
        const age = matchedUserData.get('age').properties.age;
        const sex = matchedUserData.get('sex').properties.sex;
        const user = { memberSince, name, username, image_url, online, city, age, sex };

        return user;
      });
      log('[getMatches] Sending matches!', matchedUsers);
      res.json(matchedUsers);
    });
  },

  viewMatch({ body: { username } }, res) {
    log(`[viewMatch] Received request for ${username}`);
    toggleView(username, () => res.sendStatus(201));
  },

  findNewMatches({ params }, res) {
    log(`[findNewMatches] Received request for ${params.username}`);
    getNewMatches(params.username, newMatches => res.json(newMatches));
  },
};
