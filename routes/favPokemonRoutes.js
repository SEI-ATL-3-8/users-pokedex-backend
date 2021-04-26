const favPokemonRoutes = require('express').Router()
const favPokemonController = require('../controllers/favPokemonController')

favPokemonRoutes.get('/', favPokemonController.index)
favPokemonRoutes.post('/', favPokemonController.create)
favPokemonRoutes.delete('/:id', favPokemonController.destroy)

module.exports = favPokemonRoutes