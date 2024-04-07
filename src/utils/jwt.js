const jwt = require('jsonwebtoken');

const signJwt = (payload, options) => {
  return jwt.sign(payload, process.env.JWT_PRIVATE, {
    ...(options && options),
    algorithm: 'RS256'
  });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_PUBLIC);
    return {
      valid: true,
      expired: false,
      decoded
    };
  } catch (error) {
    return {
      valid: false,
      expired: error.message === 'jwt expired or not eligible to use',
      decoded: null
    };
  }
};

module.exports = { signJwt, verifyToken };
