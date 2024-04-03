const { Router } = require('express');
const { getTable, createTable, updateTable, deleteTable, deleteAllTable } = require('../controllers/table.controller');

const TableRouter = Router();

TableRouter.get('/', getTable);
TableRouter.get('/:id', getTable);
TableRouter.post('/add', createTable);
TableRouter.put('/update/:id', updateTable);
TableRouter.delete('/delete/:id', deleteTable);
TableRouter.delete('/delete', deleteAllTable);

module.exports = TableRouter;
