const { Router } = require('express');
const { getMenu, addMenu } = require('../controllers/menu.controller');

const MenuRouter = Router();

MenuRouter.get('/', getMenu);
MenuRouter.get('/:id', getMenu);
MenuRouter.post('/add', addMenu);

module.exports = MenuRouter;
