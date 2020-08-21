'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const secret = 'clave_secreta_para_jwt'

exports.ensureAuth = function(req, res, next){

  if(!req.headers.authorization){
    return res.status(403).send({message: 'La peticion no tiene cabecera authorization'})
  }
  let token = req.headers.authorization.replace(/['"]+/g, '')
  let payload
  try{
    payload = jwt.decode(token, secret)
    if(payload.exp <= moment().unix){
      return res.status(401).send({message: 'Token ha expirado'})
    }
  }catch(ex){
    console.log(ex)
    return res.status(404).send({message: 'Token no valido'})
  }

  req.user = payload

  next()

}