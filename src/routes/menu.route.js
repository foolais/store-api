const { Router } = require('express');
const { getMenu, addMenu, updateMenu, changeAvailableMenu, deleteMenu } = require('../controllers/menu.controller');

const { requireAdmin } = require('../middleware/authUser');

const MenuRouter = Router();

MenuRouter.get('/', getMenu);
MenuRouter.get('/:id', getMenu);
MenuRouter.post('/add', requireAdmin, addMenu);
MenuRouter.put('/update/:id', requireAdmin, updateMenu);
MenuRouter.post('/update/status', requireAdmin, changeAvailableMenu);
MenuRouter.delete('/delete/:id', requireAdmin, deleteMenu);

module.exports = MenuRouter;
