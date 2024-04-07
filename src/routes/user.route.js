const { Router } = require('express');
const { createUser, createSession } = require('../controllers/user.controller');

const UserRouter = Router();

UserRouter.post('/register', createUser);
UserRouter.post('/login', createSession);

module.exports = UserRouter;
