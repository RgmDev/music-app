'use strict'

const express = require('express')
const songController = require('../controllers/song')

let api = express.Router()
let md_auth = require('../middleware/authenticate')

const multiparty = require('connect-multiparty')
let md_upload = multiparty({ uploadDir: './uploads/songs'})

api.get('/song', md_auth.ensureAuth, songController.getSong)


module.exports = api