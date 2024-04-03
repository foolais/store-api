const tableModel = require('../models/table.model');

const getAllTable = async () => {
  return await tableModel.find();
};

const addTableData = async (payload) => {
  return await tableModel.create(payload);
};

module.exports = { getAllTable, addTableData };