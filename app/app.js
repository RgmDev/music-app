'use strict'

const express = require('express')
const bodyParser = require('body-parser')

var app = express()

// cargar rutas
let userRoutes = require('./routes/user')
let artistRoutes = require('./routes/artist')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// configurar cabeceras

// rutas base
app.use('/api', userRoutes)
app.use('/api', artistRoutes)

app.get('/', (req, res) => {
  res.status(200).send({message: 'Bienvenido'})
})


module.exports = app