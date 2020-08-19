'use strict'

const fs = require('fs')
const path = require('path')
const mongoosePagination = require('mongoose-pagination')

const Artist = require('../models/artist')
const Album = require('../models/album')
const Song = require('../models/song')

function getSong(req, res){
  res.status(200).send({ message: 'controlador de cancion'})
}

module.exports = {
  getSong
}