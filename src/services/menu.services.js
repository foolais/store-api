const menuModel = require('../models/menu.model');

const getAllMenu = async () => {
  return await menuModel.find().sort({ category: -1 });
};

const getMenuById = async (id) => {
  return await menuModel.findById({ _id: id }, { new: true });
};

module.exports = { getAllMenu, getMenuById };
