const jwt = require('jsonwebtoken');
const PassportFacebookStrategy = require('passport-facebook').Strategy;
const User = require('../user/userModel');

module.exports = new PassportFacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:8080/auth/facebook/callback',
  profileFields: ['id', 'first_name', 'email', 'birthday', 'location', 'gender', 'education', 'work'],
}, (accessToken, refreshToken, profile, done) => {
  console.log('Facebook profile data : ', profile._json);
  const { id, first_name, email, birthday = '', location = '', gender = '', education = '', work = '' } = profile._json;
  console.log('passport/facebook birthday : ', birthday);
  const userData = {
    username: id,
    name: first_name,
    email,
    password: email,
    age: new Date().getFullYear() - Number(birthday.slice(0, 4)),
    city: location,
    sex: gender,
    edLevel: education,
    job: work,
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
