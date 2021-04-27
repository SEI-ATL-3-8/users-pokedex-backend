const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/signup', userController.createUser);
userRouter.post('/login', userController.login);
userRouter.get('/verify',userController.verify);

module.exports = userRouter;