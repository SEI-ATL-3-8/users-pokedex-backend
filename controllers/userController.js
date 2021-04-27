require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const models = require('../models')


const userController = {}


userController.signUp = async (req, res) => {
    try {
      const hashedPassword = bcrypt.hashSync(req.body.Password, 10)
      const user = await models.user.create({
        name: req.body.Name,
        email: req.body.Email,
        password: hashedPassword
      })
      const encryptedId = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
      res.json({message: 'Signed up', userId: encryptedId, userName: user.name, userEmail: user.email})
    } catch (error) {
        res.json({message: error.message})

    }
}

userController.login = async (req, res) => {
    try {
      const user = await models.user.findOne({
        where: {
          email: req.body.Email
        }
      })
      if (bcrypt.compareSync(req.body.Password, user.password)) {
        const encryptedId = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
        res.json({message: 'login successful', userId: encryptedId, userName: user.name, userEmail: user.email})
      }else{
        res.status(401)
        res.json({ error: 'Password is incorrect' })
      }
    } catch (error) {
      res.status(400)
      res.json({ error: 'login failed' })
    }
 }

userController.getUser = async(req,res) => {
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const user = await models.user.findOne({where:{
        id: decryptedId.userId
      }})

      if(user){
        let userName = user.name
        let userEmail = user.email
        res.json({userName, userEmail})
      }else{
        res.status(404).json({ message: 'user not found' })
      }
    } catch (error) {
        res.json({error})
    }
}


  










module.exports = userController;