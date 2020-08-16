'use strict'

const express = require('express')
const userController = require('../controllers/user')

let api = express.Router()
let md_auth = require('../middleware/authenticate')

const multiparty = require('connect-multiparty')
let md_upload = multiparty({ uploadDir: './uploads/users'})

api.get('/pruebasController', md_auth.ensureAuth, userController.pruebas)
api.post('/saveUser', userController.saveUser)
api.put('/updateUser/:id', md_auth.ensureAuth, userController.updateUser)
api.post('/login', userController.loginUser)
api.post('/uploadImageUser/:id', [md_auth.ensureAuth, md_upload], userController.uploadImage)
api.get('/getImageUser/:imageFile', userController.getImageFile)

module.exports = api