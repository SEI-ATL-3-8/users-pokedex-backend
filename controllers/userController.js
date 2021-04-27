const models = require('../models')

const userController = {}

userController.create = async (req, res) => {
  try {
    const user = await models.user.create({
      email: req.body.email,
      password: req.body.password,
    })
    res.json({ user })
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message })
  }
}

userController.login = async(req, res) => {
  try {
    const user = await models.user.findOne({
      where: { email: req.body.email }
    })

    if (user.password === req.body.password) {
      res.json({ user, message: 'login successful' })
    } else {
      res.status(401).json({ message: 'login failed' })
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message })    
  }
}

userController.verify = async(req, res) => {
  try {
    const user = await models.user.findOne({
      where: { id: req.headers.authorization }
    })
  
    if (user) {
      res.json({ user, message: 'user found' })
    } else {
      res.status(404).json({ message: 'user not found' })
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message })    
  }
}

module.exports = userController