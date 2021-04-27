const models = require('../models')
const userController = {}

userController.new = async (req, res) => {
    try {
        const newUser = await models.user.findOrCreate({
            where: {
                email: req.body.email
            },
            defaults: {
                username: req.body.username,
                password: req.body.password
            }
        })
        res.json({
            status: 200,
            message: 'User created',
            user: newUser
        })
    } catch (error) {
        res.json({
            status: 400,
            message: 'Could not create user',
            error
        })
    }
}

userController.login = async (req, res) => {
    try {
        const foundUser = await models.user.findOne({
            where: {
                email: req.body.email
            }
        })
        
        if(foundUser.password === req.body.password) {
            res.json({
                status: 200,
                message: 'User logged in',
                user: foundUser
            })
        } else {
            res.json({
                status: 401,
                message: 'User not found',
            })
        }

    } catch (error) {
        res.json({
            status: 400,
            message: 'Could not log in user',
            error
        })
    }
}


userController.verify = async (req, res) => {
    try {
        console.log(req.headers);
        const foundUser = await models.user.findOne({
            where: {
                id: req.headers.authorization
            }
        })
        console.log(foundUser);
        if(foundUser.id) {
            res.json({
                status: 200,
                message: 'Here is the logged in user',
                user: foundUser
            })
        } else {
            res.json({
                status: 401,
                message: 'User not found',
            })
        }

    } catch (error) {
        res.json({
            status: 400,
            message: 'Could not verify user',
            error
        })
    }
}

module.exports = userController