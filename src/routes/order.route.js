const { Router } = require('express');
const { getAllOrder, addOrder } = require('../controllers/order.controller');

const orderRouter = Router();

orderRouter.get('/', getAllOrder);
orderRouter.post('/add', addOrder);

module.exports = orderRouter;
