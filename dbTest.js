const models = require('./models')

const testing = async () => {
  const userReport = await models.user.findOrCreate({
    where: { email: 'test1@test.com' }
  })

  const user = userReport[0]

  const pikaReport = await models.favPokemon.findOrCreate({
    where: { name: 'pikachu' }
  })

  const pika = pikaReport[0]

  await user.addFavPokemon(pika)

  const userFavs = await user.getFavPokemons()

  console.log(userFavs);
}

testing()
