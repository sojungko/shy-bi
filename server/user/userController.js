/* ---------------- * SERVER/USER/USERCONTROLLER.JS * ---------------
 *
 * This file contains all user methods and serves as an intermediary
 * layer between routes.js and userModel.js. Methods in this file are
 * responsible for invoking methods in the userModel.js
 *
 * Methods in this file are:
 *
 *  1) SIGN UP : signUp({ body: { name, username, email } }, res)
 *
 * --------------------------------------------------------------- */

// Plucks addUser methods from user/userModel.js
const { addUser } = require('./userModel');

module.exports = {
  //
  /* -------------------------- * SIGN UP * -------------------------
   *
   *   - Calls addUser method. (see user/userModel.js)
   *   - Sends 201 status as response.
   *
   *    Parameters:
   *      • req | Object | request object
   *        - destuctured to pluck name, username, and email from its body
   *      • res | Object | response object
   *
   *    Returns:
   *      - No explicit return
   *
   * --------------------------------------------------------------- */

  signUp({ body: { name, username, email } }, res) {
    console.log(`1) [UserController.js/signup] Signing up ${name}`);

    addUser(name, username, email, () => {
      console.log('4) [UserController.js/singup] Success, sending back 201 status');
      res.sendStatus(201);
    });
  },
};
