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
	pago: [{  id: Number,
              comentario: String,
              costo: Number,
			  comida: Number,
             creado: { type: Date, default: Date.now }
           }],
	recibo: Number
})

ProfesorSchema.plugin(dincrement,  { 'pago': 'id' });

module.exports = mongoose.model('Profesor', ProfesorSchema)
