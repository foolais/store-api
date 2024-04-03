const { Router } = require('express');
const { getMenu, addMenu, updateMenu, changeAvailableMenu, deleteMenu } = require('../controllers/menu.controller');

const MenuRouter = Router();

MenuRouter.get('/', getMenu);
MenuRouter.get('/:id', getMenu);
MenuRouter.post('/add', addMenu);
MenuRouter.put('/update/:id', updateMenu);
MenuRouter.post('/update/status', changeAvailableMenu);
MenuRouter.delete('/delete/:id', deleteMenu);

module.exports = MenuRouter;
