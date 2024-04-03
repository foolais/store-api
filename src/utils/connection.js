const mongoose = require('mongoose');
const config = require('../config/environment');
const logger = require('../utils/logger');

mongoose
  .connect(`${config.db}`)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((err) => {
    logger.error(`Failed to connect to MongoDB: ${err}`);
    process.exit(1);
  });
