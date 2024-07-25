const menuModel = require('../models/menu.model');
const tableModel = require('../models/table.model');
const orderModel = require('../models/order.model');

const getOverviewData = async () => {
  const totalMenu = await menuModel.countDocuments();
  const totalTable = await tableModel.countDocuments();
  const orders = await orderModel.find();

  const finishedOrders = orders.filter((order) => order.is_finished);
  const totalOrder = finishedOrders.length;

  const totalEarnings = orders.reduce((total, order) => total + order.total_price, 0);

  return { totalMenu, totalTable, totalOrder, totalEarnings };
};

const getDataForMonth = async (year, month) => {
  // console.log({ year, month });
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  const weeklyEarnings = [0, 0, 0, 0, 0];

  const orders = await orderModel.find({
    'timestamps.created_at': {
      $gte: startDate,
      $lt: endDate
    }
  });

  const finishedOrders = orders.filter((order) => order.is_finished);

  finishedOrders.forEach((order) => {
    const orderDate = order.timestamps.created_at;
    const weekIndex = Math.floor((orderDate.getDate() - 1) / 7);

    if (weekIndex >= 0 && weekIndex < weeklyEarnings.length) {
      weeklyEarnings[weekIndex] += order.total_price;
    }
  });

  return weeklyEarnings;
};

module.exports = { getOverviewData, getDataForMonth };
