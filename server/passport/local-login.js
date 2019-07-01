require('dotenv').config();
import jwt from 'jsonwebtoken';
import debug from 'debug';

import PassportLocalStrategy from 'passport-local';
import User from '../user/user-controller';

const log = debug('server:passport:local-login');
const err = debug('server:passport:local-login:error');

export default new PassportLocalStrategy.Strategy({
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
