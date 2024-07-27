require('dotenv/config');

const CONFIG = {
  db: process.env.DB,
  JWT_PUBLIC: process.env.JWT_PUBLIC,
  JWT_PRIVATE: process.env.JWT_PRIVATE
};

module.exports = CONFIG;
