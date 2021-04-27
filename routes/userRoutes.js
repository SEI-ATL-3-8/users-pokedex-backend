const userController = require('../controllers/userController')
const express = require('express')
const userRoutes = express.Router()

userRoutes.post('/signup', userController.signUp)

module.exports = userRoutes;