const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;
const User = require('../user/userController');

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
    console.log('local-login err : ', err);
    const payload = {
      sub: user.username,
    };
    const token = jwt.sign(payload, process.env.PASSPORT_SECRET);
    return done(null, token, user);
  });
});
