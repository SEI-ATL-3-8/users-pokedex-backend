const models = require('../models')
const userController = {}


userController.create = async (req,res) =>{
  
  console.log(req.body);
    try {
        const newUser = await models.user.create({
            name:req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        res.json({newUser})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

userController.login = async(req,res) => {
    try {
        const user = await models.user.findOne({
            where:{
                email: req.body.email

            }       
        })
        if (user.password === req.body.password){
            res.json({message: 'login successful', user:user})
        }
    } catch (error) {
        res.status(401).json({ error: 'login failed' })
    }
    
}

userController.findOne = async(req,res) =>{

    try {
        const oneUser = await models.user.findOne({
            where:{id: req.headers.authorization}
        })
        res.json({oneUser})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = userController
