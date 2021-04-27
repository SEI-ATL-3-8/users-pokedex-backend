const userRoutes = require('express').Router()
const userController = require('../controllers/userController')

userRoutes.post('/', userController.create)
userRoutes.post('/login', userController.find)
// userRoutes.get('/verify', userController.destroy)

module.exports = userRoutes