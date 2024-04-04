const orderModel = require('../models/order.model');

const getAllOrderData = async () => {
  const data = await orderModel
    .find()
    .populate('menu._id', 'name price category')
    .populate('table._id', 'name status category');
  console.log({ data });
  return data;
};

const addOrderData = async (payload) => {
  const newOrder = new orderModel(payload);
  return await newOrder.save();
};

module.exports = { getAllOrderData, addOrderData };
