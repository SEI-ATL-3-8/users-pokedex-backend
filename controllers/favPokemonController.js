const models = require('../models')
const favPokemonController = {}

favPokemonController.index = async (req, res) => {
  try {
    if (req.headers.authorization)
    {
      const user = await models.user.findOne({ where: { id: req.headers.authorization}});
      if (user)
      {
        const favPokemon = await user.getFavPokemons();
        res.json({ favPokemon })
      }
    }
    
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

favPokemonController.create = async (req, res) => {
  try {
    const newFavPokemon = await models.favPokemon.create({
      name: req.body.name
    })
    const user = await models.user.findOne({ where: { id: req.headers.authorization}});

    if (user)
    {
      user.addFavPokemon(newFavPokemon);
    }

    res.json({ newFavPokemon })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

favPokemonController.destroy = async (req, res) => {
  try {
    const deleteResult = await models.favPokemon.findOne({
      where: { name: req.params.name }
    })
    const user = await models.user.findOne({ where: { id: req.headers.authorization}});

    if (user)
    {
      user.removeFavPokemon(deleteResult);
      deleteResult.destroy();
    }
    res.json({ deleteResult })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = favPokemonController