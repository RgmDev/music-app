'use strict'

const express = require('express')
const artistController = require('../controllers/artist')

let api = express.Router()
let md_auth = require('../middleware/authenticate')

const multiparty = require('connect-multiparty')
let md_upload = multiparty({ uploadDir: './uploads/artists'})

api.get('/artist/:id', md_auth.ensureAuth, artistController.getArtist)
api.post('/artist', md_auth.ensureAuth, artistController.saveArtist)
api.get('/artists/:page?', md_auth.ensureAuth, artistController.getArtists)
api.put('/artist/:id', md_auth.ensureAuth, artistController.updateArtist)
api.delete('/artist/:id', md_auth.ensureAuth, artistController.deleteArtist)
api.post('/uploadImageArtist/:id', [md_auth.ensureAuth, md_upload], artistController.uploadImage)
api.get('/getImageArtist/:imageFile', artistController.getImageFile)

module.exports = api