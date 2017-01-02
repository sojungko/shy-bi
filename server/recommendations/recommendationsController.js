const { getRecMatches } = require('./recommendationsModel');

module.exports = {

  getRecommendedMatches({ query }, res) {
    console.log(`1) [recommendationsController.js/getRecommendedMatches] Getting recommended matches for ${query.user}`);
  }
}
