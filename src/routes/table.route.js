const { Router } = require('express');
const { getTable, createTable, updateTable } = require('../controllers/table.controller');

const TableRouter = Router();

TableRouter.get('/', getTable);
TableRouter.get('/:id', getTable);
TableRouter.post('/add', createTable);
TableRouter.put('/update/:id', updateTable);

module.exports = TableRouter;
