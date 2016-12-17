const db = require('../database/config');

module.exports = {
  users: {
    addUser(username) {
      console.log(`userModel.js/addUser: Adding user ${username} to the database`);
      db.run('CREATE (user:User {name: {username}}) RETURN user', { username })
      .then((result) => {
        db.close();
        console.log(`${username} has been added, sending back: `, result, ' to userController as Promise');
        return result;
      })
      .catch((error) => {
        console.error(`Could not add ${username} to the database ${error}`)
      });
    },
  },
};
