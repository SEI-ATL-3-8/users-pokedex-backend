const userRoutes = require('express').Router()
const userController = require('../controllers/UserController')

userRoutes.post('/', userController.createUser)
userRoutes.post('/login', userController.loginUser)
userRoutes.get('/verify', userController.verifyUser)


module.exports = userRoutes