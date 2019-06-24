const debug = require('debug');

const { getMatchedUsers, toggleView, getNewMatches } = require('./matches-model');

let log = debug('server:matches:controller').bind(this);

module.exports = {

  getMatches({ params }, res) {
    // log = log.extend('getMatches');
    log('Received request for ', params.username);
    getMatchedUsers(params, (matches) => {
      log('Completed database query for ', params.username);
      const matchedUsers = matches.map((matchedUserData, index) => {
        log(`${index}) parsing data`);
        // Getting User data
        const { properties: { memberSince, name, username, image_url, online } } = matchedUserData.get('liked');
        const city = matchedUserData.get('city').properties.name;
        const age = matchedUserData.get('age').properties.age;
        const sex = matchedUserData.get('sex').properties.sex;
        const user = { memberSince, name, username, image_url, online, city, age, sex };

        return user;
      });
      log('Sending matches!', matchedUsers);
      res.json(matchedUsers);
    });
  },

  viewMatch({ body: { username } }, res) {
    // log = log.extend('viewMatch');
    log(`Received request for ${username}`);
    toggleView(username, () => res.sendStatus(201));
  },

  findNewMatches({ params }, res) {
    // // log = log.extend('findNewMatches');
    log(`Received request for ${params.username}`);
    getNewMatches(params.username, newMatches => res.json(newMatches));
  },
};
