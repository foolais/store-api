const userModel = require('../models/user.model');

const createUserData = async (payload) => {
  return await userModel.create(payload);
};

module.exports = { createUserData };
