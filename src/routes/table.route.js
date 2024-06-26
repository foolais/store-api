const { Router } = require('express');
const {
  getTable,
  createTable,
  updateTable,
  deleteTable,
  deleteAllTable,
  changeOrderTable
} = require('../controllers/table.controller');

const { requireSuperAdmin } = require('../middleware/authUser');

const TableRouter = Router();

TableRouter.get('/', getTable);
TableRouter.get('/:id', getTable);
TableRouter.post('/add', requireSuperAdmin, createTable);
TableRouter.put('/update/:id', requireSuperAdmin, updateTable);
TableRouter.delete('/delete/:id', requireSuperAdmin, deleteTable);
TableRouter.delete('/delete', requireSuperAdmin, deleteAllTable);
TableRouter.post('/update/status', requireSuperAdmin, changeOrderTable);

module.exports = TableRouter;
