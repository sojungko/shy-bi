const debug = process.env.NODE_ENV === 'development' ? require('debug') : () => { };

const request = require('request');

const log = debug('server:locaation:controller');

module.exports = {
  getLocations({ body }, res) {
    const APIKey = process.env.GOOGLE_API_KEY;
    log('body.input : ', body.input);
    request(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${body.input}&types=(cities)&key=${APIKey}`,
    (error, response, results) => {
      if (!error && res.statusCode === 200) {
        res.send(results);
      }
    });
  },
};
