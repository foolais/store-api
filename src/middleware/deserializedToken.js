const { verifyToken } = require('../utils/jwt');

const deserializedToken = async (req, res, next) => {
  const accessToken = req.headers.authorization?.replace(/^Bearer\s/, '');
  if (!accessToken) return next();

  const { decoded, expired } = verifyToken(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired) return next();

  return next();
};

module.exports = deserializedToken;
