/* ---------------- * SERVER/MESSAGES/MESSAGESCONTROLLER.JS * ---------------
 *
 * This file contains all user methods and serves as an intermediary
 * layer between routes.js and messagesModel.js. Methods in this file are
 * responsible for invoking methods in the messagesModel.js
 *
 * Methods in this file are:
 *
 *  1) FIND ALL MESSAGES : findAllMessages({ params }, res)
 *  2) SEND MESSAGE
 *
 * --------------------------------------------------------------- */

// Plucks getAll methods from messagesModel.js
const { getAll } = require('./messagesModel');

module.exports = {
  //
  /* -------------------------- * FIND ALL MESSAGES * -------------------------
   *
   * Calls getAll method. (see messagesModel.js)
   *
   *  Parameters:
   *    • req | Object | request object
   *        - destuctured to pluck params object
   *    • res | Object | response object
   *
   * -Sample API Route: /api/messages/all/sojung
   * -Sample req.param = {username: 'sojung'}
   * -Sample response object:

       [
         {
           "name": "So Jung Park",
           "username": "sojung",
           "senderName": "Adam Wang",
           "senderUsername": "adam",
           "title": "Lunch",
           "body": "What are you having for lunch"
         },
         {
           "name": "So Jung Park",
           "username": "sojung",
           "senderName": "Tim Yin",
           "senderUsername": "tim",
           "title": "Savage",
           "body": "So jung, you are a savage"
         }
       ]
   *
   *  Returns:
   *    • No explicit return
   *
   * --------------------------------------------------------------- */

  findAllMessages({ params }, res) {
    console.log(`1) [MessagesController.js/findAllMessages] Searching for
      ${params.username} messages`);

    getAll(params, (messagesData) => {
      console.log(`4) [MessagesController.js/findAllMessages] Success!
        Parsing messages & building res object`);

      const messages = messagesData.map((message, index) => {
        console.log(`4-${index}) [SearchController.js/findAll] parsing message ${index} data: `,
          message);

        const { properties: { name, username } } = message.get('user');

        // Getting User location data
        const { properties: { name: senderName, username: senderUsername } }
          = message.get('sender');

        // Getting User age data
        const { properties: { title, body } } = message.get('msgs');

        // Putting together a user data object.
        return { name, username, senderName, senderUsername, title, body };
      });

      res.json(messages);
    });
  },

  sendMessage({ params }, res) {
    console.log(`1) [MessagesController.js/findAllMessages] Searching for
      ${params.username} messages`);
  },

};
