'use strict'

const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user')
const jwt = require('../services/jwt')

function pruebas(req, res){
  res.status(200).send({
    message: 'pruebas de controlador'}
  )
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

  return res.status(500).send({update})

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



module.exports = {
  pruebas,
  saveUser,
  loginUser,
  updateUser
}