const { Router } = require('express');
const { getAllOrder, addOrder, updateOrder, deleteOrder } = require('../controllers/order.controller');

const orderRouter = Router();

orderRouter.get('/', getAllOrder);
orderRouter.post('/add', addOrder);
orderRouter.put('/update/:id', updateOrder);
orderRouter.delete('/delete/:id', deleteOrder);

module.exports = orderRouter;
