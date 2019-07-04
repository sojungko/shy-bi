import jwt from 'jsonwebtoken';
import debug from 'debug';

import PassportLocalStrategy from 'passport-local';
import { signIn } from '../user/user-controller';

require('dotenv').config();

const log = debug('server:passport:local-login');
const err = debug('server:passport:local-login:error');

export default new PassportLocalStrategy.Strategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, username, password, done) => {
  signIn(req, (error, user) => {
    if (error) {
      err(error);
      done(error);
    }
    log('local-login err : ', error);
    const payload = {
      sub: user.username,
    };
    const token = jwt.sign(payload, process.env.PASSPORT_SECRET, { expiresIn: 60 * 60 });
    return done(null, token, user);
  });
});
