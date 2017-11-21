const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes');
const telegram = require('./telegram');
const ngrok = require('./ngrok');

const errorHandler = (type) => (err) => {
  console.error(type);
  console.error(err.stack);
  process.exit(1);
};
process.on('uncaughtException', errorHandler('uncaughtException'));
process.on('unhandledRejection', errorHandler('unhandledRejection'));

(async () => {
  await telegram.deleteWebhook();
  const tun = await ngrok.findHttpsTunnel();
  await telegram.setWebhook(`${tun.public_url}/webhook/?token=${config.webhook.finalToken}`);
  const webhookInfo = await telegram.getWebhookInfo();

  const app = express();
  app.use(bodyParser.json());
  app.use('/', routes);
  app.listen(config.webhook.serverPort, config.webhook.serverHostname, () => {
    console.log(`app listening on ${config.webhook.serverHostname}:${config.webhook.serverPort}`);
  });
})();
