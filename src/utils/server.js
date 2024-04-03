const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const routes = require('../routes');

const createServer = () => {
  const app = express();

  // parse body request
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // cors access handler
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT'],
      allowHeaders: ['Content-Type']
    })
  );

  routes(app);

  return app;
};

module.exports = createServer;
