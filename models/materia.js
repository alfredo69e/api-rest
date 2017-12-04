'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MateriaSchema = Schema({
    nombre: { type: String, unique: true },
    unidad_credito: String,
    nivel: String,
    ano_curso: String, 
    creado: { type:Date, default: Date.now }
})

module.exports = mongoose.model('Materia', MateriaSchema)
