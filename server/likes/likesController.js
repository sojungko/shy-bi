const { like, unlike } = require('./likesModel');

module.exports = {
  likeUser({ body }, res) {
    console.log(`1) [UserController.js/likeUser] ${body.username} is liking ${body.likedUser}`);
    like(body, () => {
      console.log('4) [UserController.js/likeUser] Success! Sending back 201 status');
      res.sendStatus(201);
    });
  },

  unlikeUser({ body }, res) {
    console.log(`1) [UserController.js/unlikeUser] ${body.username} is unliking ${body.unlikedUser}`);
    unlike(body, (data) => {
      console.log(`4) [UserController.js/unlikeUser] ${data}`);
      res.sendStatus(201);
    });
  },
}
