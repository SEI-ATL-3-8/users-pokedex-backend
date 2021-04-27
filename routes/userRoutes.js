const userRoutes = require('express').Router()
const userControllers = require('../controllers/userControllers')

userRoutes.post('/signup', userControllers.create)
userRoutes.post('/login', userControllers.login)
userRoutes.get('/verify', userControllers.findUser)

module.exports = userRoutes