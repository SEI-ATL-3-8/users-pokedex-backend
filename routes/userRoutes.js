const userRoutes = require('express').Router()
const userController = require('../controllers/userController')

userRoutes.get('/verify', userController.verifyUser)
userRoutes.post('/', userController.createUser)
userRoutes.post('/login', userController.login)

module.exports = userRoutes;