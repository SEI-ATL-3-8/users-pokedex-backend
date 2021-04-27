const express = require('express')
const userController = require('../controllers/userController')
const userRoutes = express.Router()

userRoutes.get('/profile', userController.userProfile)
userRoutes.get('/', userController.getAll)
userRoutes.get('/:id', userController.getUser)
userRoutes.post('/', userController.createUser)
userRoutes.post('/login', userController.login)
userRoutes.put('/:id', userController.update)
userRoutes.delete('/:id', userController.destroy)


userRoutes.get('/:id/allFavpokemons', userController.allFavpokemons)
userRoutes.post('/:id/addFavpokemon', userController.addFavpokemon)

module.exports = userRoutes;