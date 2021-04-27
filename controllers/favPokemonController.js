const models = require('../models')
const favPokemonController = {}

favPokemonController.index = async (req, res) => {
  try {
    const favPokemon = await models.favPokemon.findAll({
      where: {
        userId: req.headers.authorization
      }
    })
    res.json({ favPokemon })
    
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

favPokemonController.create = async (req, res) => {
  try {
    const [newFavPokemon, created] = await models.favPokemon.findOrCreate({
      where: {
        name: req.body.name
      }
    })
    let user = await models.user.findOne({
      where: {
        id: req.headers.authorization
      }
    })
    await user.addFavPokemon(newFavPokemon)
    res.json({ newFavPokemon })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

favPokemonController.destroy = async (req, res) => {
  try {
    const deleteResult = await models.favPokemon.destroy({
      where: { name: req.params.id }
    })
    let user = await models.user.findOne({
      where: {
        id: req.headers.authorization
      }
    })
    await user.removeFavPokemon(deleteResult)
    res.json({ deleteResult })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = favPokemonController