const request = require('request');

module.exports = {
  getLocations({ body }, res) {
    const APIKey = process.env.GOOGLE_API_KEY;
    console.log('locationController.js body.input : ', body.input);
    request(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${body.input}&types=(cities)&key=${APIKey}`,
    (error, response, results) => {
      if (!error && res.statusCode === 200) {
        res.send(results);
      }
    });
  },
};
