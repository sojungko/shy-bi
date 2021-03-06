import jwt from 'jsonwebtoken';
import PassportFacebookStrategy from 'passport-facebook';
import User from '../user/user-model';

export default new PassportFacebookStrategy.Strategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://www.bind.cool/auth/facebook/callback',
  profileFields: ['id', 'first_name', 'email', 'birthday', 'location', 'gender', 'education', 'work'],
}, (accessToken, refreshToken, profile, done) => {
  console.log('Facebook profile data : ', profile._json);
  const { id, first_name, email } = profile._json;
  const userData = {
    username: id,
    name: first_name,
    email,
    password: email,
    age: '',
    city: '',
    sex: '',
  };
  User.getUserByEmail(email, (results) => {
    console.log('results : ', results);
    if (results.length === 0) {
      User.addUser(userData, () => {
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
