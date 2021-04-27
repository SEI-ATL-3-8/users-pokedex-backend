const models = require('../models')
const favPokemonController = {}

favPokemonController.index = async (req, res) => {
  try {
    const user = await models.user.findOne({
      where: { id: req.headers.authorization }
    })

    const favPokemon = await user.getFavPokemons()
    res.json({ favPokemon })
    
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

favPokemonController.create = async (req, res) => {
  try {
    const user = await models.user.findOne({
      where: { id: req.headers.authorization }
    })

    if (user === null) {
      res.status(404).json({ message: 'user not found' })
      return
    }
    
    const newFavPokemon = await models.favPokemon.create({
      name: req.body.name
    })

    await user.addFavPokemon(newFavPokemon)

    res.json({ newFavPokemon })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

favPokemonController.destroy = async (req, res) => {
  try {
    const user = await models.user.findOne({
      where: { id: req.headers.authorization }
    })

    const deleteResult = await models.favPokemon.destroy({
      where: {
        name: req.params.name,
        userId: user.id
      }
    })

    res.json({ deleteResult })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = favPokemonController