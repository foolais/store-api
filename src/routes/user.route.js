const { Router } = require('express');
const { createUser } = require('../controllers/user.controller');

const UserRouter = Router();

UserRouter.post('/add', createUser);

module.exports = UserRouter;
