const { Router } = require('express');
const { getMenu, addMenu, updateMenu } = require('../controllers/menu.controller');

const MenuRouter = Router();

MenuRouter.get('/', getMenu);
MenuRouter.get('/:id', getMenu);
MenuRouter.post('/add', addMenu);
MenuRouter.put('/update/:id', updateMenu);

module.exports = MenuRouter;
