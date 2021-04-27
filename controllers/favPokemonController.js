const models = require('../models')
const favPokemonController = {}
const jwt = require('jsonwebtoken')

favPokemonController.index = async (req, res) => {
  try {
    const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)

    const user = await models.user.findOne ({
        where: {
            id: decryptedId.userId
        }
    })

    const savedPokemon = await user.getFavPokemons()

    res.json({savedPokemon})
    
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}

favPokemonController.create = async (req, res) => {
  try {
    const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    console.log(decryptedId)

    const user = await models.user.findOne ({
        where: {
            id: decryptedId.userId
        }
    })
    
    const newFavPokemon = await models.favPokemon.create({
      name: req.body.name
    })

    const savedPokemon = await user.addFavPokemon(newFavPokemon)

    res.json({message: 'Pokemon saved', savedPokemon})
    
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}

favPokemonController.destroy = async (req, res) => {
  try {
    const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)

    const user = await models.user.findOne ({
        where: {
            id: decryptedId.userId
        }
    })

    const pokemon = await models.favPokemon.findOne({
      where: { name: req.params.id }
    })

    const removeFav = await user.removeFavPokemon(pokemon)

    const deleteResult = await models.favPokemon.destroy({
      where: { name: req.params.id }
    })
    
    res.json({ deleteResult, removeFav })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}

module.exports = favPokemonController