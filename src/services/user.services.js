const userModel = require('../models/user.model');

const createUserData = async (payload) => {
  return await userModel.create(payload);
};

const getUsersByEmail = async (email) => {
  return await userModel.findOne({ email });
};

module.exports = { createUserData, getUsersByEmail };
