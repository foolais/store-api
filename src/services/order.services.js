const orderModel = require('../models/order.model');

const getAllOrderData = async () => {
  const data = await orderModel
    .find()
    .populate('menu._id', 'name price category')
    .populate('table._id', 'name category');
  return data;
};

const getOrderById = async (id) => {
  const data = await orderModel
    .findById({ _id: id })
    .populate('menu._id', 'name price category')
    .populate('table._id', 'name category');
  return data;
};

const addOrderData = async (payload) => {
  const newOrder = new orderModel(payload);
  return await newOrder.save();
};

const updateOrderDataById = async (id, payload) => {
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
