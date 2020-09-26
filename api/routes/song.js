'use strict'

const express = require('express')
const songController = require('../controllers/song')

let api = express.Router()
let md_auth = require('../middleware/authenticate')

const multiparty = require('connect-multiparty')
let md_upload = multiparty({ uploadDir: './uploads/songs'})

api.get('/song/:id', md_auth.ensureAuth, songController.getSong)
api.post('/song', md_auth.ensureAuth, songController.saveSong)
api.get('/songs/:album?', md_auth.ensureAuth, songController.getSongs)
api.put('/song/:id', md_auth.ensureAuth, songController.updateSong)
api.delete('/song/:id', md_auth.ensureAuth, songController.deleteSong)
api.post('/upload-file-song/:id', [md_auth.ensureAuth, md_upload], songController.uploadFile)
api.get('/get-song-file/:songFile', songController.getSongFile)


module.exports = api