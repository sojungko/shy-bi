require('dotenv').config();
const jwt = require('jsonwebtoken');
const debug = require('debug');

const PassportLocalStrategy = require('passport-local').Strategy;
const User = require('../user/user-controller');

const log = debug('server:passport:local-login');

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, username, password, done) => {
  User.signIn(req, (err, user) => {
    if (err) {
      done(err);
    }
    log('local-login err : ', err);
    const payload = {
      sub: user.username,
    };
    const token = jwt.sign(payload, process.env.PASSPORT_SECRET, { expiresIn: 60 * 60 });
    return done(null, token, user);
  });
});
