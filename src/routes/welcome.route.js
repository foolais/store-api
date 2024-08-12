const { Router } = require('express');

const WelcomeRouter = Router();

WelcomeRouter.get('/', (req, res) => {
  res.send('Welcome to Foolaisx Store API');
});

module.exports = WelcomeRouter;
