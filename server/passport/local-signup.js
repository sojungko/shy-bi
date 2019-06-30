require('dotenv').config();
const jwt = require('jsonwebtoken');
const debug = require('debug');

const User = require('../user/user-controller');
const PassportLocalStrategy = require('passport-local').Strategy;

const log = debug('server:passport:local-signup')
const err = debug('server:passport:local-signup:error')

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, username, password, done) => {
  User.signUp(req, (user) => {
    if (!user) {
      log('Username already exists');
      return done('Username already exists');
    }
    log('User successfully added');
    const payload = {
      sub: user.username,
    };
    const token = jwt.sign(payload, process.env.PASSPORT_SECRET, { expiresIn: 60 * 60 });
    return done(null, token, user);
  });
});
