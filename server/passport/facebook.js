const jwt = require('jsonwebtoken');
const PassportFacebookStrategy = require('passport-facebook').Strategy;
const User = require('../user/userModel');

module.exports = new PassportFacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:8080/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'picture', 'email'],
}, (accessToken, refreshToken, profile, done) => {
  console.log('Facebook profile data : ', profile);
});
