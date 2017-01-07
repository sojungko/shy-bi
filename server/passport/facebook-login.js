const PassportFacebookStrategy = require('passport-facebook').Strategy;
const User = require('../user/userController');

module.exports = new PassportFacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:8080/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'picture'],
}, (accessToken, refreshToken, profile, done) => {
  console.log('access token: ', accessToken);
  console.log('refresh token: ', refreshToken);
  console.log('Facebook profile!!!: ', profile);
  return done(null);
});
