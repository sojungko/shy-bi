const { like, unlike } = require('./likesModel');

module.exports = {
  likeUser({ body }, res) {
    console.log(`1) [LikesController.js/likeUser] ${body.username} is liking ${body.likedUser}`);
    like(body, (isMatch) => {
      console.log('4) [LikesController.js/likeUser] Success! Sending back 201 status : ', isMatch);
      res.status(201).json(isMatch);
    });
  },

  unlikeUser({ body }, res) {
    console.log(`1) [LikesController.js/unlikeUser] ${body.username} is unliking ${body.unlikedUser}`);
    unlike(body, (data) => {
      console.log(`4) [LikesController.js/unlikeUser] ${data}`);
      res.sendStatus(201);
    });
  },
}
