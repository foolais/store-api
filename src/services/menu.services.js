const menuModel = require('../models/menu.model');

const getAllMenu = async () => {
  return await menuModel.find().sort({ category: -1 });
};

const getMenuById = async (id) => {
  return await menuModel.findById({ _id: id }, { new: true });
};

const addMenuData = async (payload) => {
  return await menuModel.create(payload);
};

const updateMenuData = async (id, payload) => {
  return await menuModel.findByIdAndUpdate({ _id: id }, payload, { new: true });
};

module.exports = { getAllMenu, getMenuById, addMenuData, updateMenuData };
