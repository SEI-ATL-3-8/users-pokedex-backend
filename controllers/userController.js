const models = require('../models')
const userController = {}

userController.create = async (req, res) => {
    try {
        let newUser = await models.user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json({newUser})
    } catch (error) {
        res.json({error})
    }
}

userController.login = async (req, res) => {
    const user = await models.user.findOne({
        where: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    })
    if (user && (user.password === req.body.password)) {
        console.log(user)
        res.json ({id: user.id, name: user.name})
    } else {
        res.status(401)
        console.log({error: 'login failed'})
    }
}

module.exports = userController