const { getRecMatches } = require('./recommendationsModel');

module.exports = {

  getRecommendedMatches({ params }, res) {
    console.log(`1) [recommendationsController.js/getRecommendedMatches] Getting recommended matches for ${params.username}`);
    getRecMatches(params, () => {
        console.log(`4) [recommendationsController.js/getRecommendedMatches] Success!
        Chunking data & building res object`);

        // Getting User data
        const { properties: { memberSince, name, username } } = userData.get('user');
        const city = userData.get('city').properties.name;
        const age = userData.get('age').properties.age;
        const sex = userData.get('sex').properties.sex;
        const user = { memberSince, name, username, city, age, sex };

        return user;
    })
  }
}
