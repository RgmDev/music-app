'use strict'

const fs = require('fs')
const path = require('path')
const mongoosePagination = require('mongoose-pagination')

const Artist = require('../models/artist')
const Album = require('../models/album')
const Song = require('../models/song')

function getAlbum(req, res){
  let id = req.params.id
  Album.findById(id).populate({ path: 'artist'}).exec((err, album) => {
    if(err){
      res.status(500).send({message: 'Error en la petición'})
    }else{
      if(!album){
        res.status(404).send({message: 'El album no existe'})
      }else{
        res.status(200).send({album})
      }
    }
  })
}

function saveAlbum(req, res){

  let album = new Album()
  let params = req.body
  album.title = params.title
  album.description = params.description
  album.year = params.year
  album.image = null 
  album.artist = params.artist
  
  album.save((err, albumStored) => {
    if(err){
      res.status(500).send({message: 'Error al guardar el album'})
    }else{
      if(!albumStored){
        res.status(404).send({message: 'El album no ha sido guardado'})
      }else{
        res.status(200).send({album: albumStored})
      }
    }
  })
}

function getAlbums(req, res){
  let artistId = req.params.artist
  if(!artistId){
    var find = Album.find().sort('title')
  }else{
    var find = Album.find({ artist: artistId }).sort({year: 'desc'})
  }
  find.populate({ path: 'artist'}).exec((err, albums) => {
    if(err){
      res.status(500).send({message: 'Error en la petición'})
    }else{
      if(!albums){
        res.status(404).send({message: 'No hay albums'})
      }else{
        res.status(200).send({ albums })
      }
    }
  })
  
}

function updateAlbum(req, res){
  let albumId = req.params.id
  let update = req.body
  Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
    if(err){
      res.status(500).send({message: 'Error al guardar el album'})
    }else{
      if(!albumUpdated){
        res.status(404).send({message: 'El album no ha sido actualizado'})
      }else{
        res.status(200).send({album: albumUpdated})
      }
    }
  })
}

function deleteAlbum(req, res){
  let AlbumId = req.params.id
  Album.findByIdAndRemove(AlbumId, (err, albumRemoved) => {
    if(err){
      res.status(500).send({message: 'Error al eliminar el albúm'})
    }else{
      if(!albumRemoved){
        res.status(404).send({message: 'El albúm no ha sido eliminado'})
      }else{
        Song.find({album: albumRemoved._id}).remove((err, songRemoved) => {
          if(err){
            res.status(500).send({message: 'Error al eliminar la canción'})
          }else{
            if(!songRemoved){
              res.status(404).send({message: 'La canción no ha sido eliminado'})
            }else{
              res.status(200).send({album: albumRemoved})
            }
          }
        })
      }
    }
  })
}

function uploadImage(req, res){
  let id = req.params.id
  let file_name = 'No subido...'
  if(req.files){
    let file_path = req.files.image.path
    let file_split = file_path.split('\\')
    file_name = file_split[2]
    let ext_split = file_name.split('\.')
    let file_ext = ext_split[1]
    if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg'){
      Album.findByIdAndUpdate(id, {image: file_name}, (err, albumUpdated) => {
        if(!albumUpdated){
          res.status(404).send({ message: 'No se ha podido actualizar la imagen del album' })
        }else{
          res.status(200).send({ user: albumUpdated })
        }
      })
    }else{
      res.status(200).send({ message: 'Extensión de archivo no valida' })
    }
  }else{
    res.status(200).send({ message: 'No ha subido la imagen' })
  }
}

function getImageAlbum(req, res){
  let image_file = req.params.id
  let path_file = './uploads/albums/'+image_file
  fs.exists(path_file, (exists) =>{
    if(exists){
      res.sendFile(path.resolve(path_file))
    }else{
      res.status(200).send({ message: 'No existe la imagen...' })
    }
  })
}

module.exports = {
  getAlbum,
  saveAlbum,
  getAlbums,
  updateAlbum,
  deleteAlbum,
  uploadImage,
  getImageAlbum
}