const { errorResponse } = require('../utils/response');

const requireUser = (req, res, next) => {
  const user = res.locals.user;
  if (!user) {
    return errorResponse(403, null, 'Unauthorized', 'Unauthorized', null, res);
  }

  return next();
};

const requireAdmin = (req, res, next) => {
  const user = res.locals.user;
  if (!user || (user._doc.role !== 'admin' && user._doc.role !== 'super admin')) {
    return errorResponse(403, null, 'Unauthorized', 'Unauthorized', null, res);
  }

  return next();
};

module.exports = { requireUser, requireAdmin };
