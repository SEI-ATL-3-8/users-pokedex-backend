const models = require('../models')
const userController = {}
const jwt = require('jsonwebtoken')

userController.createUser = async (req, res) => {
    try {
        const user = await models.user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        const encryptedId = jwt.sign( { userId: user.id }, process.env.JWT_SECRET)

        res.json({message: 'Signup successful!', userId: encryptedId, user})

    } catch (error) {
        console.log(error)
        res.status(400)
    }
}

userController.loginUser = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {
                email: req.body.email
            }
        })

        const encryptedId = jwt.sign ( { userId: user.id }, process.env.JWT_SECRET)

        if ( user.checkPassword(req.body.password) ) {
            res.json({message: 'Login successful', userId: encryptedId, user})
        } else {
            res.status(400)
            res.json({error: 'Login failed'})
        }

    } catch (error) {
        console.log(error)
        res.status(400)
    }

}

userController.verifyUser = async (req, res) => {
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)

        const user = await models.user.findOne ({
            where: {
                id: decryptedId.userId
            }
        })

        const encryptedId = jwt.sign ( { userId: user.id }, process.env.JWT_SECRET)

        res.json({message: 'User verified', userId: encryptedId, user})
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}





module.exports = userController