const { Router } = require('express');
const { getAllOrder, addOrder, updateOrder } = require('../controllers/order.controller');

const orderRouter = Router();

orderRouter.get('/', getAllOrder);
orderRouter.post('/add', addOrder);
orderRouter.put('/update/:id', updateOrder);

module.exports = orderRouter;
