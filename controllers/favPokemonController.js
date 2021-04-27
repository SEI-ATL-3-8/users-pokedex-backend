const models = require('../models')
const favPokemonController = {}

favPokemonController.index = async (req, res) => {
  try {
    // find logged in user
    console.log('START');
    const foundUser = await models.user.findOne({
      where: {
        id: req.headers.authorization
      },
      include: models.favPokemon
    })
    console.log('foundUser', foundUser.dataValues);
    const favPokemon = await models.favPokemon.findAll({
      where: {
        userId: foundUser.id
      }
    })
    console.log('favPokemon', favPokemon.dataValues);
    res.json({ favs: foundUser.favPokemon, favPokemon })
    
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

favPokemonController.create = async (req, res) => {
  try {
    const foundUser = await models.user.findOne({
      where: {
        id: req.headers.authorization
      }
    })
    const newFavPokemon = await models.favPokemon.create({
      name: req.body.name,
      // userId: foundUser.id
    })
    const association = await newFavPokemon.setUser(foundUser)
    console.log('association', association);
    res.json({ newFavPokemon, association })
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