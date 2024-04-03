const { Router } = require('express');
const { getTable } = require('../controllers/table.controller');

const TableRouter = Router();

TableRouter.get('/', getTable);

module.exports = TableRouter;
