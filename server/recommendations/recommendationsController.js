const { getRecMatches } = require('./recommendationsModel');

module.exports = {

  getRecommendedMatches({ params }, res) {
    console.log(`1) [recommendationsController.js/getRecommendedMatches] Getting recommended matches for ${params.username}`);
    getRecMatches(params, (matches) => {
      console.log(`4) [recommendationsController.js/getRecommendedMatches] Success! Building res object`);

      const matchedUsers = matches.map((matchedUserData, index) => {
        console.log(`4-${index}) [recommendationsController.js/getRecommendedMatches] parsing data`);
          // Getting User data
        const { properties: { memberSince, name, username } } = matchedUserData.get('recUsers');
        const city = matchedUserData.get('city').properties.name;
        const age = matchedUserData.get('age').properties.age;
        const sex = matchedUserData.get('sex').properties.sex;
        const user = { memberSince, name, username, city, age, sex };

        return user;
      });
      console.log(`5) [recommendationsController.js/getRecommendedMatches] Sending potential matches!`, matchedUsers);
      res.json(matchedUsers);
    });
  },
};
