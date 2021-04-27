const models = require('../models')
const favPokemonController = {}

favPokemonController.index = async (req, res) => {
  try {
    const favPokemon = await models.favPokemon.findAll()
    res.json({ favPokemon })
    
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

favPokemonController.create = async (req, res) => {
  try {
    const newFavPokemon = await models.favPokemon.create({
      name: req.body.name
    })
    res.json({ newFavPokemon })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

favPokemonController.destroy = async (req, res) => {
  try {
    const deleteResult = await models.favPokemon.destroy({
      where: { id: req.params.id }
    })
    res.json({ deleteResult })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}



module.exports = favPokemonController