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

const changeOrderTableData = async (id, payload) => {
  const table = await tableModel.findById(id);

  Object.keys(payload).forEach((key) => {
    if (payload[key] && key !== 'id') {
      table[key] = payload[key];
    }
  });

  payload.timestamps.updated_at = Date.now();

  await table.save();

  return table;
};

module.exports = {
  getAllTable,
  getTableById,
  addTableData,
  updateTableData,
  deleteTableById,
  deleteAllTableData,
  changeOrderTableData
};
