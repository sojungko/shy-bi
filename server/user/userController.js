const userModel = require('./userModel');

module.exports = {
  users: {
    signup({ body: { username } }, res) {
      console.log(username);
      userModel.users.addUser(username)
        .then((success) => success)
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
