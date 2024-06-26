const orderModel = require('../models/order.model');
const tableModel = require('../models/table.model');
const generateUniqueNumber = require('../utils/numberOrderGenerator');
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

const getOrderByTableID = async (id) => {
  return await orderModel.findOne({ 'table._id': id });
};

const addOrderData = async (payload) => {
  const latestOrder = await orderModel.findOne().sort({
    'timestamps.created_at': -1
  });

  const latestNumberOrder = latestOrder?.number_order || null;

  const number_order = generateUniqueNumber(latestNumberOrder);
  const newOrder = new orderModel({ ...payload, number_order });
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

const changeStatusOrderData = async (valueQuery, valueBody) => {
  try {
    const { id, is_finished } = valueQuery;

    const order = await orderModel.findById(id);
    const table = await tableModel.findById(order.table._id);

    if (!order) {
      throw new Error('Order not found');
    }

    if (!table) {
      throw new Error('Table not found');
    }

    if (is_finished === 'true') {
      await orderModel.findByIdAndUpdate({ _id: id }, valueBody);
      await updateTableData(table._id, { is_order: false, status: 'empty' });
    } else if (is_finished === 'false') {
      updateTableData(table._id, { is_order: true });
    }

    order.is_finished = is_finished;
    order.timestamps.updated_at = Date.now();

    await order.save();

    return order;
  } catch (error) {
    throw error;
  }
};

const toggleMenuOrderServedStatus = async (payload) => {
  try {
    const { order_id, menu_id } = payload;

    const order = await orderModel.findById(order_id);
    const table = await tableModel.findById(order.table._id);
    const menu = order.menu.find((item) => item._id.toString() === menu_id.toString());

    if (!order) throw new Error('Order not found');
    if (!table) throw new Error('Table not found');
    if (!menu) throw new Error('Menu not found');

    menu.is_served = !menu.is_served;

    const isAllMenuServed = order.menu.every((item) => item.is_served);
    if (isAllMenuServed) {
      updateTableData(table._id, { status: 'eating' });
    } else {
      updateTableData(table._id, { status: 'waiting' });
    }

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
  changeStatusOrderData,
  getOrderByTableID,
  toggleMenuOrderServedStatus
};
