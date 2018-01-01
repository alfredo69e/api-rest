'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dincrement = require('dsi-mongoose-auto-increment')

const PagoAlumnoSchema = Schema({
  id: String,
  costo: Number,
  comentario: String,
  creado: { type: Date, default: Date.now },
  usuario: String
})

//for individual model:
PagoAlumnoSchema.plugin(dincrement);

module.exports = mongoose.model('PagoAlumno', PagoAlumnoSchema)
