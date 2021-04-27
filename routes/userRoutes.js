const userController = require('../controllers/userController')
const express = require('express')
const userRoutes = require('express').Router()

userRoutes.post('/', userController.create)
userRoutes.post('/login', userController.login)

module.exports =userRoutes