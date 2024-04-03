const logger = require('../utils/logger');

const generateResponse = (statusCode, data, message, loggerMessage, error, res, level) => {
  const response = {
    statusCode,
    message: `${message}`
  };

  if (data !== null) response.data = data;

  logger[level](`${statusCode} ${loggerMessage} ${error ? error : ''}`);
  res.status(statusCode).send(response);
};

const successResponse = (...args) => generateResponse(...args, 'info');
const notFoundResponse = (...args) => generateResponse(...args, 'warn');
const badRequestResponse = (...args) => generateResponse(...args, 'warn');
const errorResponse = (...args) => generateResponse(...args, 'error');

module.exports = { successResponse, notFoundResponse, badRequestResponse, errorResponse };
