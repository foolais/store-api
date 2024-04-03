const tableModel = require('../models/table.model');

const getAllTable = async () => {
  try {
    return await tableModel.find();
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllTable };
