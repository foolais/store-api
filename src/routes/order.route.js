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

const { requireSuperAdmin } = require('../middleware/authUser');

const orderRouter = Router();

orderRouter.get('/', getAllOrder);
orderRouter.get('/:id', getSingleOrder);
orderRouter.get('/table/:id', getSingleOrderByTableID);
orderRouter.post('/add', requireSuperAdmin, addOrder);
orderRouter.put('/update/:id', requireSuperAdmin, updateOrder);
orderRouter.post('/update/status', requireSuperAdmin, changeStatusOrder);
orderRouter.post('/update/menu/status', requireSuperAdmin, toggleMenuOrderServed);
orderRouter.delete('/delete/:id', requireSuperAdmin, deleteOrder);

module.exports = orderRouter;
