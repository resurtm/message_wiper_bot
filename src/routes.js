const express = require('express');

const routes = express.Router();

routes.post('/webhook/', function webhookHandler(req, res) {
  console.log(req.body);
  res.sendStatus(200);
});

module.exports = routes;
