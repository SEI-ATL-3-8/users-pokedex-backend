const models = require('../models')
const userController = {}

userController.signup = async (req, res) => {
    try {
        const user = await models.user.findOrCreate({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        })
        res.json({user})
    } catch (error) {
        res.json({error: error.message})
    }
}

userController.login = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        })
        res.json({user})
    } catch (error) {
        res.json({error: error.message})
    }
}

module.exports = userController