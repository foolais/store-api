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

const changeAvailableMenuData = async (id) => {
  // find menuModel by id
  const menu = await menuModel.findById(id);

  // toogle the value of is_available field
  menu.is_available = !menu.is_available;

  // save updated document
  await menu.save();

  return menu; // return updated document
};

module.exports = { getAllMenu, getMenuById, addMenuData, updateMenuData, changeAvailableMenuData };
