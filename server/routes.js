const bodyParser = require('body-parser');
const path = require('path');
const userController = require('./user/userController');

module.exports = (app, express) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '/../node_modules')));
  app.use(express.static(path.join(__dirname, '/../build')));

  app.post('/api/users/signup', userController.users.signup);
};
