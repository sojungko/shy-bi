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
const { getAll, postMessage} = require('./messagesModel');

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

        const { properties: { name: receivedBy, username: receiverID } }
          = message.get('user');

        // Getting User location data
        const { properties: { name: sentBy, username: senderID } }
          = message.get('sender');

        // Getting User age data
        const { properties: { title, body, created } } = message.get('msgs');

        // Putting together a user data object.
        return { receivedBy, receiverID, sentBy, senderID, title, body, created };
      });

      res.json(messages);
    });
  },

  //
  /* -------------------------- * SEND MESSAGES * -------------------------
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
         "receivedBy": "So Jung Park",
         "receiverID": "sojung",
         "sentBy": "Peter Schussheim",
         "senderID": "peter",
         "title": "interview",
         "body": "good luck!"
         "created": {
           "low": 590319644,
           "high": 345
         }
       },
       {
         "receivedBy": "So Jung Park",
         "receiverID": "sojung",
         "sentBy": "Adam Wang",
         "senderID": "adam",
         "title": "Lunch",
         "body": "What are you having for lunch"
         "created": {
           "low": 581568470,
           "high": 345
         }
       },
      ]
   *
   *
   *  Returns:
   *    • No explicit return
   *
   * --------------------------------------------------------------- */
  sendMessage({ body: { senderID, receiverID, title, body } }, res) {
    console.log(`1) [MessagesController.js/sendMessage] ${senderID} is sending message
      title: ${title}
      body: ${body}
      to ${receiverID}`);

    postMessage(senderID, receiverID, title, body, () => {
      console.log('4) [MessagesController.js/sendMessage] Success, sending back 201 status');
      res.sendStatus(201);
    });
  },
};
