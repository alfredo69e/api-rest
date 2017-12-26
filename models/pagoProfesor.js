'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dincrement = require('dsi-mongoose-auto-increment')

const PagoProfSchema = Schema({
  id: String,
  comentario: String,
  costo: Number,
	comida: Number,
  creado: { type: Date, default: Date.now }
})

//for individual model:
PagoProfSchema.plugin(dincrement);

module.exports = mongoose.model('PagoProf', PagoProfSchema)
