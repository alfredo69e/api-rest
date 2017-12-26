'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dincrement = require('dsi-mongoose-auto-increment')

const MatriculaSchema = Schema({
    id_alumno: String,
    matricula: [{ nivel: String,
                  cuatrimestre: String,
                  materias: []
               }],
    creado: { type: Date, default: Date.now },
    usuario: String,
    finalizo: String,
    costo: Number
})

//for individual model:
MatriculaSchema.plugin(dincrement);


module.exports = mongoose.model('Matricula', MatriculaSchema)
