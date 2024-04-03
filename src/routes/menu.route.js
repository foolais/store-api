const { Router } = require('express');
const { getMenu } = require('../controllers/menu.controller');

const MenuRouter = Router();

MenuRouter.get('/', getMenu);
MenuRouter.get('/:id', getMenu);

module.exports = MenuRouter;
