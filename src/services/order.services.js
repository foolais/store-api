const orderModel = require('../models/order.model');
const tableModel = require('../models/table.model');
const { updateTableData } = require('./table.services');

const getAllOrderData = async () => {
  try {
    const orders = await orderModel.find();

    const result = orders.map((order) => {
      const orderObj = order.toObject();
      delete orderObj.menu;
      return orderObj;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const getOrderById = async (id) => {
  const data = await orderModel.findById({ _id: id });
  return data;
};

const addOrderData = async (payload) => {
  const newOrder = new orderModel(payload);
  return await newOrder.save();
};

const updateOrderDataById = async (id, payload) => {
  const order = await orderModel.findById(id);
  order.timestamps.updated_at = Date.now();

  return await orderModel.findByIdAndUpdate({ _id: id }, payload, { new: true });
};

const deleteOrderDataById = async (id) => {
  return await orderModel.findByIdAndDelete({ _id: id }, { new: true });
};

const changeStatusOrderData = async (payload) => {
  try {
    const { id, is_finished } = payload;

    const order = await orderModel.findById(id);
    const table = await tableModel.findById(order.table._id);

    if (!order) {
      throw new Error('Order not found');
    }

    if (!table) {
      throw new Error('Table not found');
    }

    if (is_finished === 'true') {
      updateTableData(table._id, { isOrder: false });
    } else if (is_finished === 'false') {
      updateTableData(table._id, { isOrder: true });
    }

    order.is_finished = is_finished;
    order.timestamps.updated_at = Date.now();

    await order.save();

    return order;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllOrderData,
  getOrderById,
  addOrderData,
  updateOrderDataById,
  deleteOrderDataById,
  changeStatusOrderData
};
