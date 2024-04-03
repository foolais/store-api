const { Router } = require('express');
const { getTable, createTable } = require('../controllers/table.controller');

const TableRouter = Router();

TableRouter.get('/', getTable);
TableRouter.get('/:id', getTable);
TableRouter.post('/add', createTable);

module.exports = TableRouter;
