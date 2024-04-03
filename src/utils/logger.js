const pino = require('pino');
const pretty = require('pino-pretty');
const moment = require('moment');

const logger = pino(
  {
    base: {
      pid: false
    },
    timestamp: () => `,"time":"${moment().format('LTS')}"`
  },
  pretty()
);

module.exports = logger;
