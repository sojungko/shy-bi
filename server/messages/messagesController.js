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
 *  3) SENT MESSAGES
 *
 * --------------------------------------------------------------- */
const debug = process.env.NODE_ENV === 'development' ? require('debug') : () => { };

// Plucks getAll methods from messagesModel.js
const { getAll, postMessage, getOutbox, toggleRead, getUnreadMsgs } = require('./messagesModel');

const log = debug('server:messages:controller');

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
    log(`[findAllMessages] Searching for
      ${params.username} messages`);

    getAll(params, (messagesData) => {
      log(`[findAllMessages] Success!
        Parsing messages & building res object`);

      const messages = messagesData.map((message, index) => {
        log(`${index}) [findAll] parsing message ${index} data: `,
          message);

        const { properties: { name: receivedBy, username: receiverID } }
          = message.get('user');
        const msgID = message.get('ID(msgs)').toNumber();
        const { properties: { name: sentBy, username: senderID } }
          = message.get('sender');
        const { title, body, deletedBySender, deletedByReceiver, read } = message.get('msgs').properties;
        const created = message.get('msgs').properties.created.toNumber();

        return {
          sentBy,
          senderID,
          receivedBy,
          receiverID,
          msgID,
          created,
          read,
          title,
          body,
          deletedBySender,
          deletedByReceiver,
        };
      });

      res.json(messages);
    });
  },

  //
  /* -------------------------- * SEND MESSAGES * -------------------------
   *
   * Calls getAll method. (see messagesModel.js)
   * Sends 201 status as a response.
   *
   *  Parameters:
   *    • req | Object | request object
   *        - destuctured to pluck senderID, receiverID, title, body from body object
   *    • res | Object | response object
   *
   *  Returns:
   *    • No explicit return
   *
   * --------------------------------------------------------------- */
  sendMessage({ body }, res) {
    log(body);
    log(`[sendMessage] ${body.senderID} is sending message
      title: ${body.title}
      body: ${body.body}
      to ${body.receiverID}`);

    postMessage(body, () => {
      log('[sendMessage] Success, sending back 201 status');
      res.sendStatus(201);
    });
  },

  //
  /* -------------------------- * FIND SENT MESSAGES * -------------------------
   *
   * Calls getAllSent method. (see messagesModel.js)
   * Sends 201 status as a response.
   *
   * -Sample API Route: api/messages/sent/tim
   * -Sample req.param = {username: 'tim'}
   * -Sample response object:
   *
      [
       {
         "sentBy": "Tim Yin",
         "senderID": "tim",
         "receivedBy": "So Jung Park",
         "receiverID": "sojung",
         "title": "Savage",
         "body": "So jung, you are a savage",
         "created": {
           "low": 581830138,
           "high": 345
         }
       }
      ]
   *
   *  Parameters:
   *    • req | Object | request object
   *        - destuctured to pluck params object
   *    • res | Object | response object
   *
   *  Returns:
   *    • No explicit return
   *
   * --------------------------------------------------------------- */
  sentMessages({ params }, res) {
    log(`[sentMessages]
      searching for messages sent by ${params.username} `);

    getOutbox(params, (sentMessagesData) => {
      log(`[sentMessages] Success!
        Parsing messages & building res object`);

      const sentMessages = sentMessagesData.map((message, index) => {
        log(`${index}) [sentMessages] parsing message
          ${index} data:`, message);

        const { properties: { name: sentBy, username: senderID } }
          = message.get('user');
        const msgID = message.get('ID(msgs)').toNumber();
        const { properties: { name: receivedBy, username: receiverID } }
          = message.get('receiver');
        const { title, body, deletedBySender, deletedByReceiver, read } = message.get('msgs').properties;
        const created = message.get('msgs').properties.created.toNumber();

        return {
          sentBy,
          senderID,
          receivedBy,
          receiverID,
          msgID,
          created,
          read,
          title,
          body,
          deletedBySender,
          deletedByReceiver,
        };
      });

      res.json(sentMessages);
    });
  },

  readMsg({ body }, res) {
    toggleRead(body, data => res.json(data));
  },

  findUnreadMessages({ params }, res) {
    getUnreadMsgs(params, UnreadMsgs => res.json(UnreadMsgs));
  },
};
