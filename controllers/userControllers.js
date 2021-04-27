const models = require('../models')
const userControllers = {}

//Create user
userControllers.create = async (req, res) => {
    try {
        const createUser = await models.user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json({createUser})
    }catch(error) {
        console.log(error);
    }
}

userControllers.login = async (req, res) => {
    try{
        const findUser = await models.user.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        })
        res.json({findUser})
    }catch (error) {
        console.log(error);
    }
}

userControllers.findUser = async (res, req) => {
    try {
        console.log(req.headers);
        const verifyUser = await models.user.findOne({
            where: {
                id: req.headers.authorization
            }
        })
        console.log(verifyUser);
        res.json({verifyUser})
    }catch (error) {
        console.log(error);
    }
}

module.exports = userControllers