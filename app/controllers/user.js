'use strict'

const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user')
const jwt = require('../services/jwt')
const fs = require('fs')
const path = require('path')

function pruebas(req, res){
  res.status(200).send({ message: 'pruebas de controlador'})
}

function saveUser(req, res){
  let user = new User()
  let params = req.body

  console.log(params)

  user.name = params.name
  user.surname = params.surname
  user.email = params.email
  user.role = 'ROLE_ADMIN'
  user.image = null

  if(params.password){
    bcrypt.hash(params.password, null, null, (err, hash) => {
      user.password = hash
      if(user.name != null && user.surname != null && user.email != null){
        user.save((err, userStored) => {
          if(err){
            res.status(500).send({message: 'Error al guardar el usuario'})
          }else{
            if(!userStored){
              res.status(404).send({message: 'No se ha registrado el usuario'})
            }else{
              res.status(200).send({user: userStored})
            }
          }
        })
      }else{
        res.status(200).send({message: 'Introduce todos los campos'})
      }
    })
  }else{
    res.status(200).send({message: 'Introduce la contraseña'})
  }
}

function loginUser(req, res){

  let params = req.body
  let email = params.email 
  let password = params.password

  User.findOne({email: email.toLowerCase()}, (err, user) => {
    if(err){
      res.status(500).send({message: 'Error en la peticion'})
    }else{
      if(!user){
        res.status(404).send({message: 'El usuario no existe'})
      }else{
        bcrypt.compare(password, user.password, (err, check) => {
          if(check){
            if(params.getHash){
              res.status(200).send({
                token: jwt.createToken(user)
              })
            }else{
              res.status(200).send({user})  
            }
          }else{
            res.status(200).send({message: 'La contraseña es incorrecta'})
          }
        })
      }
    }
  })

}

function updateUser(req, res){
  let userId = req.params.id 
  let update = req.body

  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if(err){
      res.status(500).send({message: 'Error al actualizar el usuario'})
    }else{
      if(!userUpdated){
        res.status(404).send({message: 'No se ha podido actualizar el usuario'})
      }else{
        res.status(200).send({user: userUpdated})
      }
    }

  })
  
}

function uploadImage(req, res){
  let userId = req.params.id
  let file_name = 'No subido...'
  if(req.files){
    let file_path = req.files.image.path
    let file_split = file_path.split('\\')
    file_name = file_split[2]
    let ext_split = file_name.split('\.')
    let file_ext = ext_split[1]
    if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg'){
      User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) => {
        if(!userUpdated){
          res.status(404).send({ message: 'No se ha podido actualizar el usuario' })
        }else{
          res.status(200).send({ image: file_name, user: userUpdated })
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
  let path_file = './uploads/users/'+image_file
  fs.exists(path_file, (exists) =>{
    if(exists){
      res.sendFile(path.resolve(path_file))
    }else{
      res.status(200).send({ message: 'No existe la imagen...' })
    }
  })
}

module.exports = {
  pruebas,
  saveUser,
  loginUser,
  updateUser,
  uploadImage,
  getImageFile
}