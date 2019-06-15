const debug = require('debug');

const { getRecMatches } = require('./recommendationsModel');

const log = debug('server:rec:controller');

module.exports = {
  getRecommendedMatches({ params }, res) {
    log(`[getRecommendedMatches] Getting recommended matches for ${params.username}`);
    getRecMatches(params, (matches) => {
      log('[getRecommendedMatches] Success! Building res object');

      const matchedUsers = matches.map((matchedUserData, index) => {
        log(`${index}) [getRecommendedMatches] parsing data`);
          // Getting User data
        const { properties: { memberSince, name, username, image_url, online } } = matchedUserData.get('recUsers');
        const city = matchedUserData.get('city').properties.name;
        const age = matchedUserData.get('age').properties.age;
        const sex = matchedUserData.get('sex').properties.sex;
        const user = { memberSince, name, username, image_url, online, city, age, sex };

        return user;
      });
      log('[getRecommendedMatches] Sending potential matches!', matchedUsers);
      res.json(matchedUsers);
    });
  },
};
