const _ = require('lodash');
const express = require('express');
const telegram = require('./telegram');

const routes = express.Router();

routes.post('/webhook/', (req, res) => {
  const chatId = _.get(req.body, 'message.chat.id', null);
  const messageId = _.get(req.body, 'message.message_id', null);

  if (chatId !== null && messageId !== null) {
    setTimeout(() => {
      telegram.deleteMessage(chatId, messageId);
    }, 10000);
  }

  res.sendStatus(200);
});

module.exports = routes;
