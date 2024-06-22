const express = require('express');
const {getUsers, getUsersDetail, createUser, updateUser, deleteUser} = require('../controllers/UserController.js');
const { login, logout, register } = require('../controllers/AuthController.js');
const { authenticate, authAdmin } = require('../config/Middleware.js');

const UserRouter = express.Router();

UserRouter.post('/login', login);
UserRouter.post('/register', register);
UserRouter.post('/logout', logout);

UserRouter.get('/users',authenticate, getUsers);
UserRouter.get('/users/:id', authenticate, getUsersDetail);
UserRouter.post('/users', authenticate, createUser);
UserRouter.put('/users/:id', authenticate, updateUser);
UserRouter.delete('/users/:id', authAdmin,deleteUser);

module.exports = UserRouter;