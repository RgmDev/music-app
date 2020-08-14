'use strict'

const express = require('express')
const bodyParser = require('body-parser')

var app = express()

// cargar rutas

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// configurar cabeceras

// rutas base
app.get('/', (req, res) => {
  res.status(200).send({message: 'Bienvenido'})
})


module.exports = app