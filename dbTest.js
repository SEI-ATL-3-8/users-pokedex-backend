const models = require('./models')

/* const testing = async () => {
    const userA = await models.user.create({
        name: 'Tim',
        email: 'tim@test.com',
        password: '1234'
    })

    console.log(userA)

    const userB = await models.user.create({
        name: 'Ash',
        email: 'ash@test.com',
        password: '1234'
    })

    console.log(userB)

    const bulbasaur = await models.favPokemon.create({
        name: 'Bulbasaur'
    })

    console.log(bulbasaur)

    const charmander = await models.favPokemon.create({
        name: 'Charmander'
    })

    console.log(charmander)

    const squirtle = await models.favPokemon.create({
        name: 'Squirtle'
    })

    console.log(squirtle)

    const savedtry1 = await userA.addFavPokemon(bulbasaur)
    const savedtry2 = await userA.addFavPokemon(charmander)
    const savedtry3 = await userB.addFavPokemon(squirtle)
    const savedtry4 = await userB.addFavPokemon(charmander)

    console.log(savedtry1)
    console.log(savedtry2)
    console.log(savedtry3)
    console.log(savedtry4)



}

testing() */