'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const secret = 'clave_secreta_para_jwt'

exports.createToken = function(user){
  let payload = {
    sub: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    imagen: user.imagen,
    iat: moment().unix,
    exp: moment().add(30, 'days').unix
  }
  return jwt.encode(payload, secret)
}