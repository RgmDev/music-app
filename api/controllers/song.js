'use strict'

const fs = require('fs')
const path = require('path')
const mongoosePagination = require('mongoose-pagination')

const Artist = require('../models/artist')
const Album = require('../models/album')
const Song = require('../models/song')

function getSong(req, res){

  let songId = req.params.id
  Song.findById(songId).populate({path : 'album'}).exec((err, song) => {
    if(err){
      res.status(500).send({message: 'Error en la peticion'})
    }else{
      if(!song){
        res.status(404).send({message: 'La cancion no existe'})
      }else{
        res.status(200).send({song})
      }
    }
  })
}

function saveSong(req, res){
  let song = new Song()
  let params = req.body

  song.number = params.number
  song.name = params.name
  song.duration = params.duration
  song.file = null
  song.album = params.album

  song.save((err, songStored) => {
    if(err){
      res.status(500).send({message: 'Error al guardar la cancion'})
    }else{
      if(!songStored){
        res.status(404).send({message: 'La cancion no ha sido guardada'})
      }else{
        res.status(200).send({song: songStored})
      }
    }
  })
}

function getSongs(req, res){

  let albumId = req.params.album
  
  if(!albumId){
    var find = Song.find({}).sort('number')
  }else{
    var find = Song.find({album : albumId}).sort('number')
  }

  find.populate({
    path : 'album',
    populate: {
      path: 'artist',
      model : 'Artist'
    }
  }).exec((err, songs) => {
    if(err){
      res.status(500).send({message: 'Error en la petición'})
    }else{
      if(!songs){
        res.status(404).send({message: 'No hay canciones'})
      }else{
        res.status(200).send({ songs })
      }
    }
  })

}

function updateSong(req, res){

  let id = req.params.id
  let update = req.body

  Song.findByIdAndUpdate(id, update, (err, songUpdated) => {
    if(err){
      res.status(500).send({message: 'Error al guardar la cancion'})
    }else{
      if(!songUpdated){
        res.status(404).send({message: 'La cancion no ha sido actualizado'})
      }else{
        res.status(200).send({song: songUpdated})
      }
    }
  })

}

function deleteSong(req, res){

  let id = req.params.id
  Song.findByIdAndRemove(id, (err, songRemoved) => {
    if(err){
      res.status(500).send({message: 'Error al eliminar la cancion'})
    }else{
      if(!songRemoved){
        res.status(404).send({message: 'La cancion no ha sido eliminada'})
      }else{
        res.status(200).send({song: songRemoved})
      }
    }
  })

}

function uploadFile(req, res){
  let SongId = req.params.id
  let file_name = 'No subido...'
  if(req.files){
    let file_path = req.files.file.path
    let file_split = file_path.split('\\')
    file_name = file_split[2]
    let ext_split = file_name.split('\.')
    let file_ext = ext_split[1]
    if(file_ext == 'mp3' || file_ext == 'ogg' ){
      Song.findByIdAndUpdate(SongId, {file: file_name}, (err, songUpdated) => {
        if(!songUpdated){
          res.status(404).send({ message: 'No se ha podido actualizar la cancion' })
        }else{
          res.status(200).send({ song: songUpdated })
        }
      })
    }else{
      res.status(200).send({ message: 'Extensión de archivo no valida' })
    }
  }else{
    res.status(200).send({ message: 'No ha subido el archivo' })
  }
}

function getSongFile(req, res){
  let image_file = req.params.songFile
  let path_file = './uploads/songs/'+image_file
  fs.exists(path_file, (exists) =>{
    if(exists){
      res.sendFile(path.resolve(path_file))
    }else{
      res.status(200).send({ message: 'No existe el fichero de audio...' })
    }
  })
}

module.exports = {
  getSong,
  saveSong,
  getSongs,
  updateSong,
  deleteSong,
  uploadFile,
  getSongFile
}