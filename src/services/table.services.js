const tableModel = require('../models/table.model');

const getAllTable = async () => {
  const sortOrder = ['regular', 'take_away', 'custom'];
  return await tableModel.aggregate([
    { $addFields: { sortOrder: { $indexOfArray: [sortOrder, '$category'] } } },
    { $sort: { sortOrder: 1, name: 1 } }
  ]);
};

const getTableById = async (id) => {
  return await tableModel.findById({ _id: id }, { new: true });
};

const addTableData = async (payload) => {
  return await tableModel.create(payload);
};

const updateTableData = async (id, payload) => {
  const table = await getTableById(id);
  table.timestamps.updated_at = Date.now();

  return await tableModel.findByIdAndUpdate({ _id: id }, payload, { new: true });
};

const deleteTableById = async (id) => {
  return await tableModel.findByIdAndDelete({ _id: id }, { new: true });
};

const deleteAllTableData = async () => {
  return await tableModel.deleteMany({});
};

module.exports = { getAllTable, getTableById, addTableData, updateTableData, deleteTableById, deleteAllTableData };
