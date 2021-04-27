const models = require('../models')

const userController = {}


userController.createUser = async (req, res) => {
    try {
        const user = await models.user.create({
            email: req.body.email,
            password: req.body.password,
        })
        res.json({ user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

userController.login = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where:{
                email: req.body.email
              }
        })
        if(user.password === req.body.password){
            res.json({message: 'login successful', user: user})
          }else{
            res.status(401)
            res.json({error:'incorrect password'})
          }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

userController.verifyUser = async (req, res) => {
        try {
            const findUser = await models.user.findOne({
                where: {
                    id: req.headers.authorization 
                }
            })
            res.json({findUser})      
        } catch (error) {
            res.json({error})
        }
    }





module.exports = userController;