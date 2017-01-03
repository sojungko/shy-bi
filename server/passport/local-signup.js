require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../user/userController');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, username, password, done) => {
  User.signUp(req, (user) => {
    if (!user) {
      console.log('passport/local-signup: Username already exists');
      return done('Username already exists');
    }
    console.log('passport/local-signup: User successfully added');
    const payload = {
      sub: user.username,
    };
    const token = jwt.sign(payload, process.env.PASSPORT_SECRET);
    return done(null, token, user);
  });
});
