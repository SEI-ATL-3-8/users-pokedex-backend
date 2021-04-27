const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const models = require("../models")
const userController = {}

//signup
userController.createUser = async (req, res) => {
    try {
        console.log(req.body)
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        const user = await models.user.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        const encryptedId = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
        console.log(encryptedId);
        res.json({ message: 'New user has been created', userId: encryptedId })

    } catch (error) {
        res.status(400)
        res.json({ error: 'User already exists with this email' })
    }
}


//login
userController.login = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {
                email: req.body.email
            }
        })
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const encryptedId = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
            res.json({ message: 'login successful', userId: encryptedId })
        } else {
            res.status(401)
            res.json({ error: 'incorrect password' })
        }
    } catch (error) {
        res.status(400)
        res.json({ error: 'login failed' })
    }
}

//get all users
userController.getAll = async (req, res) => {
    try {
        const users = await models.user.findAll()
        res.json({ users })
    } catch (error) {
        res.status(400)
        res.json({ error: 'users info not found' })
    }
}

//user info
userController.getUser = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {
                id: req.params.id
            }
        })
        res.json({ user })
    } catch (error) {
        res.status(400)
        res.json({ error: 'user info not found' })
    }
}

//update user
userController.update = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {
                id: req.params.id
            }
        })
        const updatedUser = await user.update(req.body)


        res.json({ updatedUser })
    } catch (error) {
        res.status(400)
        res.json({ error: 'user could not be updated' })
    }
}

//delete user
userController.destroy = async (req, res) => {
    try {
        const user = await models.user.findOne(
            {
                where: {
                    id: req.params.id
                }
            })
        await user.destroy()
        res.json({ user, message: 'Your account has been deleted' })
    } catch (error) {
        res.status(400)
        res.json({ error: 'could not delete user' })
    }
}

userController.userProfile = async (req, res) => {
    try {
        // we used to look up user in here
        // but now it's looked up before all routes and attached to req
        // so there's no need to look it up in here
        // furthermore, we could access req.user in any route
        // this is useful because irl, we have many many routes that want to access the currently logged in user, not just 1
        res.json({ user: req.user })
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: 'user profile not found' })
    }
}

// get all user fav pokemon
userController.allFavpokemons = async (req, res) => {
    try {
        const user = req.user
        const favPokemon = await user.getFavPokemons({
            include: models.user,
            attributes: { exclude: ['userId'] }
        })
        res.json({
            favPokemon
        })

    } catch (error) {
        console.log(error);
        res.status(400)
        res.json({
            message: 'something went wrong.'
        })
    }
}

// add a new favpokemon
userController.addFavpokemon = async (req, res) => {
    try {
        const user = req.user
        console.log(req.body);
        const newFavPokemon = await models.favPokemon.create({
            name: req.body.name
        })
        console.log(newFavPokemon);
        await user.addFavPokemon(newFavPokemon)
        res.json({ newFavPokemon })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = userController