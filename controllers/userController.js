const models = require('../models');
const userController = {};

userController.signup = (req, res) =>
{
    models.user.create({
        email: req.body.email,
        password: req.body.password
      })
      .then((user) => {
        res.json({ message: 'success', user})
      })
      .catch((error) => {
        res.status(400).json({ error: error.message })
      })
}

userController.login = (req, res) =>
{
    models.user.findOne({
        where: { email: req.body.email }
      }).then((foundUser) => {
        if (foundUser && foundUser.password === req.body.password) {
          res.json({ message: 'success', user: foundUser })
        } else {
          res.status(401).json({ message: 'login failed' })
        }
      }).catch((error) => {
        res.status(400).json({ error: error.message })
      })
}

userController.verify = (req, res) =>
{
    models.user.findOne({
        where: { id: req.headers.authorization }
      })
      .then((user) => {
        if (user) {
          res.json({ user })
        } else {
          res.status(404).json({ message: 'user not found' })
        }
      })
      .catch((error) => {
        res.json({ error })
      })
}

module.exports = userController;  