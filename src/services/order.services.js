const orderModel = require('../models/order.model');

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

const changeStatusOrderData = async (id, payload) => {
  const order = await orderModel.findById(id);

  Object.keys(payload).forEach((key) => {
    if (payload[key] && key !== 'id') {
      order[key] = payload[key];
    }
  });

  payload.timestamps.updated_at = Date.now();

  await order.save();

  return order;
};

module.exports = {
  getAllOrderData,
  getOrderById,
  addOrderData,
  updateOrderDataById,
  deleteOrderDataById,
  changeStatusOrderData
};
