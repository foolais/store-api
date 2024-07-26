const { Router } = require('express');
const {
  getAllOrder,
  addOrder,
  updateOrder,
  deleteOrder,
  getSingleOrder,
  changeStatusOrder,
  getSingleOrderByTableID,
  toggleMenuOrderServed
} = require('../controllers/order.controller');

const { requireAdmin } = require('../middleware/authUser');

const orderRouter = Router();

orderRouter.get('/', getAllOrder);
orderRouter.get('/:id', getSingleOrder);
orderRouter.get('/table/:id', getSingleOrderByTableID);
orderRouter.post('/add', requireAdmin, addOrder);
orderRouter.put('/update/:id', requireAdmin, updateOrder);
orderRouter.post('/update/status', requireAdmin, changeStatusOrder);
orderRouter.post('/update/menu/status', requireAdmin, toggleMenuOrderServed);
orderRouter.delete('/delete/:id', requireAdmin, deleteOrder);

module.exports = orderRouter;
