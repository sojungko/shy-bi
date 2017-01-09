const jwt = require('jsonwebtoken');
const PassportFacebookStrategy = require('passport-facebook').Strategy;
const User = require('../user/userModel');

module.exports = new PassportFacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:8080/auth/facebook/callback',
  profileFields: ['id', 'first_name', 'email', 'birthday', 'location', 'gender', 'education', 'work'],
}, (accessToken, refreshToken, profile, done) => {
  console.log('Facebook profile data : ', profile._json);
  const { id, first_name, email } = profile._json;
  User.getUserByEmail(email, (results) => {
    console.log('results : ', results);
    if (results.length === 0) {
      // name, username, email, password, city, age, sex,
      console.log('first_name : ', first_name)
      User.addUser(first_name, id, email, email, '', '', '', () => {
        const payload = {
          sub: email,
        };
        const token = jwt.sign(payload, process.env.PASSPORT_SECRET, { expiresIn: 60 * 60 });
        return done(null, token, email);
      });
    } else {
      console.log('results : ', results);
      const payload = {
        sub: results.username,
      };
      const token = jwt.sign(payload, process.env.PASSPORT_SECRET, { expiresIn: 60 * 60 });
      return done(null, token, results);
    }
  });
});
