const models = require('../models')
const userController = {}

userController.create = async (req, res) => {
    try {
      const newUser = await models.user.create({
          username: req.body.username,
          password: req.body.password
      })
      res.json({ newUser })
      
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  userController.find = async (req, res) => {
    try {
      const user = await models.user.findOne({
          where: {
            username: req.body.username,
            password: req.body.password
          }
      })
      res.json({ user })
      
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }




module.exports = userController