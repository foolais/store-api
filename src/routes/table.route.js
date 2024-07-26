const { Router } = require('express');
const {
  getTable,
  createTable,
  updateTable,
  deleteTable,
  deleteAllTable,
  changeOrderTable
} = require('../controllers/table.controller');

const { requireAdmin } = require('../middleware/authUser');

const TableRouter = Router();

TableRouter.get('/', getTable);
TableRouter.get('/:id', getTable);
TableRouter.post('/add', requireAdmin, createTable);
TableRouter.put('/update/:id', requireAdmin, updateTable);
TableRouter.delete('/delete/:id', requireAdmin, deleteTable);
TableRouter.delete('/delete', requireAdmin, deleteAllTable);
TableRouter.post('/update/status', requireAdmin, changeOrderTable);

module.exports = TableRouter;
