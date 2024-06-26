const logger = require('./utils/logger');
const createServer = require('./utils/server');

// connect to MongoDB
require('./utils/connection');

// connect DB
const app = createServer();
const port = 1710;

app.listen(port, () => logger.info(`Server is listening on port ${port}!`));
