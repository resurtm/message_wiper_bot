const axios = require('axios');
const config = require('./config');

const apiUrl = config.telegram.apiUrl.replace('{{ACCESS_TOKEN}}', config.telegram.botToken);

async function simpleRequest(action, method = 'get') {
  const resp = await axios({method, url: apiUrl + action});
  if (!resp.data.ok) {
    throw new Error('response data from telegram ' + action + ' is not ok');
  }
  return resp.data.result;
}

async function dataRequest(action, data) {
  const resp = await axios.post(
    apiUrl + action,
    JSON.stringify(data),
    {headers: {'Content-Type': 'application/json'}},
  );
  return resp.data.result;
}

function getMe() {
  return simpleRequest('getMe');
}

async function setWebhook(webhookUrl) {
  if (!await dataRequest('setWebhook', {url: webhookUrl})) {
    throw new Error('cannot set new webhook, to be set "' + webhookUrl + '"');
  }
}

async function deleteWebhook() {
  if (!await simpleRequest('deleteWebhook', 'post')) {
    throw new Error('cannot remove existing webhook');
  }
}

function getWebhookInfo() {
  return simpleRequest('getWebhookInfo');
}

function sendMessage({chatId, messageText, replyToMessageId, parseMode}) {
  if (typeof chatId === 'undefined' || typeof messageText === 'undefined') {
    throw new Error('"chatId" and "messageText" parameters both must be set');
  }
  const params = {chat_id: chatId, text: messageText};
  if (typeof replyToMessageId !== 'undefined') {
    params.reply_to_message_id = replyToMessageId;
  }
  if (typeof parseMode !== 'undefined') {
    params.parse_mode = parseMode;
  }
  return dataRequest('sendMessage', params);
}

function deleteMessage(chatId, messageId) {
  return dataRequest('deleteMessage', {
    chat_id: chatId,
    message_id: messageId,
  })
}

module.exports = {getMe, setWebhook, deleteWebhook, getWebhookInfo, sendMessage, deleteMessage};
