'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dincrement = require('dsi-mongoose-auto-increment')

const ProfesorSchema = Schema({
    nombre: String,
    apellido: String,
    cedula: {type: String, unique: true, lowercase: true},
    tlf: String,
    celular: { type: String, unique: true },
    correo: {type: String, unique: true, lowercase: true},
    direccion: String,
    creado: { type:Date, default: Date.now },
})

module.exports = mongoose.model('Profesor', ProfesorSchema)
