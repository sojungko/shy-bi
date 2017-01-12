const { getMatchedUsers } = require('./matchesModel');

module.exports = {

  getMatches({ params }, res) {
    console.log('1) [matchesController.js/getMatches] Received request for ', params.username);
    getMatchedUsers(params, (matches) => {
      console.log('4) [matchesController.js/getMatches] Completed database query for ', params.username);
      const matchedUsers = matches.map((matchedUserData, index) => {
        console.log(`4-${index}) [matchesController.js/getMatches] parsing data`);
        // Getting User data
        const { properties: { memberSince, name, username, image_url, online } } = matchedUserData.get('liked');
        const city = matchedUserData.get('city').properties.name;
        const age = matchedUserData.get('age').properties.age;
        const sex = matchedUserData.get('sex').properties.sex;
        const user = { memberSince, name, username, image_url, online, city, age, sex };

        return user;
      });
      console.log('5) [matchesController.js/getMatches] Sending matches!', matchedUsers);
      res.json(matchedUsers);
    });
  },

  viewMatch() {
    
  },

  getNewMatches() {

  },
};
