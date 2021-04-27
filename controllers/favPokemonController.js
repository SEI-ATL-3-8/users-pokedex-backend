require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const models = require('../models')
const favPokemonController = {}

favPokemonController.index = async (req, res) => {
  try {
    const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
      const user = await models.user.findOne({where:{
      id: decryptedId.userId
    }})
    const favs = await user.getFavPokemons()

    res.json({favs})
    
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

favPokemonController.create = async (req, res) => {
  try {
    const newFavPokemon = await models.favPokemon.findOrCreate({where:{
      name: req.body.name

    }
    })

    const user = await models.user.findOne({where: {
      email: req.body.email
    }})

    await user.addFavPokemon(newFavPokemon[0])

    const favs = await user.getFavPokemons()

    
    res.json({ newFavPokemon , favs})
  } catch (error) {
    res.status(400).json({ error: error.message })
    // res.json({error})
  }
}

favPokemonController.destroy = async (req, res) => {
  try {
    const pokemon = await models.favPokemon.findOne({
      where: { name: req.params.id }
    })
    const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
      const user = await models.user.findOne({where:{
      id: decryptedId.userId
    }})

    const deleteResult = await user.removeFavPokemon(pokemon)
    res.json({ deleteResult })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = favPokemonController