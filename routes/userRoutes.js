const userRoutes = require('express').Router()
const userController = require('../controllers/userController')

userRoutes.post('/', userController.createUser)
userRoutes.post('/login', userController.login)
// userRoutes.get('/verify', favPokemonController.index)

module.exports = userRoutes