const { Router } = require('express');
const {
  getAllOrder,
  addOrder,
  updateOrder,
  deleteOrder,
  getSingleOrder,
  changeStatusOrder
} = require('../controllers/order.controller');

const orderRouter = Router();

orderRouter.get('/', getAllOrder);
orderRouter.get('/:id', getSingleOrder);
orderRouter.post('/add', addOrder);
orderRouter.put('/update/:id', updateOrder);
orderRouter.post('/update/status', changeStatusOrder);
orderRouter.delete('/delete/:id', deleteOrder);

module.exports = orderRouter;
