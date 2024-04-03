const tableModel = require('../models/table.model');

const getAllTable = async () => {
  return await tableModel.find();
};

const getTableById = async (id) => {
  return await tableModel.findById({ _id: id });
};

const addTableData = async (payload) => {
  return await tableModel.create(payload);
};

const updateTableData = async (id, payload) => {
  return await tableModel.findByIdAndUpdate({ _id: id }, payload, { new: true });
};

module.exports = { getAllTable, getTableById, addTableData, updateTableData };
