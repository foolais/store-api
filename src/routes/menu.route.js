const { Router } = require('express');
const { getMenu, addMenu, updateMenu, changeAvailableMenu, deleteMenu } = require('../controllers/menu.controller');

const { requireSuperAdmin } = require('../middleware/authUser');

const MenuRouter = Router();

MenuRouter.get('/', getMenu);
MenuRouter.get('/:id', getMenu);
MenuRouter.post('/add', requireSuperAdmin, addMenu);
MenuRouter.put('/update/:id', requireSuperAdmin, updateMenu);
MenuRouter.post('/update/status', requireSuperAdmin, changeAvailableMenu);
MenuRouter.delete('/delete/:id', requireSuperAdmin, deleteMenu);

module.exports = MenuRouter;
