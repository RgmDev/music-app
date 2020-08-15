'use strict'

const express = require('express')
const userController = require('../controllers/user')

let api = express.Router()
let md_auth = require('../middleware/authenticate')

api.get('/pruebasController', md_auth.ensureAuth, userController.pruebas)
api.post('/saveUser', userController.saveUser)
api.post('/updateUser/:id', md_auth.ensureAuth, userController.updateUser)
api.post('/login', userController.loginUser)

module.exports = api