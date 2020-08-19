'use strict'

const express = require('express')
const albumController = require('../controllers/album')

let api = express.Router()
let md_auth = require('../middleware/authenticate')

const multiparty = require('connect-multiparty')
let md_upload = multiparty({ uploadDir: './uploads/albums'})

api.get('/album/:id', md_auth.ensureAuth, albumController.getAlbum)
api.post('/album', md_auth.ensureAuth, albumController.saveAlbum)
api.get('/albums/:artist?', md_auth.ensureAuth, albumController.getAlbums)
api.put('/album/:id', md_auth.ensureAuth, albumController.updateAlbum)
api.delete('/album/:id', md_auth.ensureAuth, albumController.deleteAlbum)
api.post('/uploadImageAlbum/:id', [md_auth.ensureAuth, md_upload], albumController.uploadImage)
api.get('/getImageAlbum/:id', albumController.getImageAlbum)

module.exports = api