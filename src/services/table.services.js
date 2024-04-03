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

module.exports = { getAllTable, getTableById, addTableData };
