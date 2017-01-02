const jwt = require('jsonwebtoken');
const User = require('../user/userModel');
const config = require('./config');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end;
  }

  const token = req.headers.authorization.split(' ')[1];
  return jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).end;
    }
    const username = decoded.sub;

    return User.getUser(username, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }
      return next();
    });
  });
};
