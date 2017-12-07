'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MatriculaSchema = Schema({
    recibo: { type: Number},
    id_alumno: String,
    matricula: [ nivel: String,
                 cuatrimestre: String,
                 materias: [ unidad_credito: String,
                             nombre: String
                           ]
               ],
    pagos: [{ inscripcion: Number, creado: { type: Date, default: Date.now }  },
              pago1: Number, creado: { type: Date, default: Date.now }  },
              pago2: Number, creado: { type: Date, default: Date.now }  },
              pago3: Number, creado: { type: Date, default: Date.now }  },
              pago4: Number, creado: { type: Date, default: Date.now }  },
              pago5: Number, creado: { type: Date, default: Date.now }  }
           }],
    creado: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Matricula', MatriculaSchema)
