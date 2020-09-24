'use strict'

const fs = require('fs')
const path = require('path')
const mongoosePagination = require('mongoose-pagination')

const Artist = require('../models/artist')
const Album = require('../models/album')
const Song = require('../models/song')

function getArtist(req, res){
  let id = req.params.id
  Artist.findById(id, (err, artist) => {
    if(err){
      res.status(500).send({message: 'Error en la petición'})
    }else{
      if(!artist){
        res.status(404).send({message: 'El artista no existe'})
      }else{
        res.status(200).send({artist})
      }
    }
  })
}

function saveArtist(req, res){
  let artist = new Artist()
  let params = req.body
  artist.name = params.name
  artist.description = params.description
  artist.image = null
  artist.save((err, artistStored) => {
    if(err){
      res.status(500).send({message: 'Error al guardar el artista'})
    }else{
      if(!artistStored){
        res.status(404).send({message: 'El artista no ha sido guardado'})
      }else{
        res.status(200).send({artist: artistStored})
      }
    }
  })
}

function getArtists(req, res){

  let page;
  if(req.params.page){
    page = req.params.page
  }else{
    page = 1
  }

  let itemsPerPage = 4

  Artist.find().sort('name').paginate(page, itemsPerPage, (err, artists, total) => {
    if(err){
      res.status(500).send({message: 'Error en la petición'})
    }else{
      if(!artists){
        res.status(404).send({message: 'No hay artistas'})
      }else{
        res.status(200).send({
          total_items: total,
          artists : artists
        })
      }
    }
  })


}

function updateArtist(req, res){

  let id = req.params.id
  let update = req.body

  Artist.findByIdAndUpdate(id, update, (err, artistUpdated) => {
    if(err){
      res.status(500).send({message: 'Error al guardar el artista'})
    }else{
      if(!artistUpdated){
        res.status(404).send({message: 'El artista no ha sido actualizado'})
      }else{
        res.status(200).send({artist: artistUpdated})
      }
    }
  })

}

function deleteArtist(req, res){

  let id = req.params.id
  Artist.findByIdAndRemove(id, (err, artistRemoved) => {
    if(err){
      res.status(500).send({message: 'Error al eliminar el artista'})
    }else{
      if(!artistRemoved){
        res.status(404).send({message: 'El artista no ha sido eliminado'})
      }else{
       
        Album.find({artist: artistRemoved._id}).remove((err, albumRemoved) => {
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

                    res.status(200).send({artist: artistRemoved})
                    
                  }
                }
              })

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
      Artist.findByIdAndUpdate(id, {image: file_name}, (err, artistUpdated) => {
        if(!artistUpdated){
          res.status(404).send({ message: 'No se ha podido actualizar el usuario' })
        }else{
          res.status(200).send({ user: artistUpdated })
        }
      })
    }else{
      res.status(200).send({ message: 'Extensión de archivo no valida' })
    }
  }else{
    res.status(200).send({ message: 'No ha subido la imagen' })
  }
}

function getImageFile(req, res){
  let image_file = req.params.imageFile
  let path_file = './uploads/artists/'+image_file
  fs.exists(path_file, (exists) =>{
    if(exists){
      res.sendFile(path.resolve(path_file))
    }else{
      res.status(200).send({ message: 'No existe la imagen...' })
    }
  })
}

module.exports = {
  getArtist,
  saveArtist,
  getArtists,
  updateArtist,
  deleteArtist,
  uploadImage,
  getImageFile
}