'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db,  { useMongoClient: true }, (err, res)  => {
    if(err) {
        return console.log(`error al Conectar al bases de datos: ${err}`)
    }    
    
    console.log('Conexion a la Bases datos establecida...')
    
    app.listen(config.port, () => {
      console.log(`API REST corriendo en http://localhost:${config.port}`);
    })
})

