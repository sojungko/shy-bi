require('dotenv').config();
import jwt from 'jsonwebtoken';
import debug from 'debug';

import User from '../user/user-controller';
import PassportLocalStrategy from 'passport-local';

const log = debug('server:passport:local-signup');
const err = debug('server:passport:local-signup:error');

const strategy = new PassportLocalStrategy.Strategy({
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

export default strategy;
