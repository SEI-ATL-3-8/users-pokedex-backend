const models = require('../models')
const favPokemonController = {}

favPokemonController.index = async (req, res) => {
  try {
    const { user } = req;

    const favPokemon = await user.getFavPokemons();

    res.json({ favPokemon })
    
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

favPokemonController.create = async (req, res) => {
  try {
    const { user } = req;
    const newFavPokemon = await models.favPokemon.create({
      name: req.body.name
    })

    user.addFavPokemon(newFavPokemon);

    res.json({ newFavPokemon })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

favPokemonController.destroy = async (req, res) => {
  const { user } = req;
  try {
    const deleteResult = await user.getFavPokemons({
      where: {
         name: req.params.id
      }
    });

    await deleteResult[0].destroy();
    
    res.json({ deleteResult: deleteResult[0] })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = favPokemonController