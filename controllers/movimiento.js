'use strict'

const Matricula = require("../models/matricula")
const Alumno = require("../models/alumno")
const Profesor = require("../models/profesor")
const PagoProf = require("../models/pagoProfesor")
const PagoAlumno = require("../models/pagoAlumno")

function buscar(req, res) {

  let retiro = 0
  let fondos = []
  let deposito = 0

 PagoProf.find({ creado: {$gte : req.body.inicio, $lte : req.body.fin} }, (err, pagoProf) => {
      if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

      for (var i = 0; i < pagoProf.length; i++) {
        retiro = retiro + (pagoProf[i].costo + pagoProf[i].comida)
        fondos.push({ retiro: pagoProf[i].costo + pagoProf[i].comida, disponible: retiro, creado: pagoProf[i].creado, comentario: pagoProf[i].comentario });
      }

  PagoAlumno.find({ creado: {$gte : req.body.inicio, $lte : req.body.fin} }, (err, pagoAlum) => {
      if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

    for (var j = 0; j < pagoAlum.length; j++) {
      deposito = deposito + (pagoAlum[j].costo + pagoAlum[j].comida)
      fondos.push({ deposito: pagoAlum[j].costo, disponible: deposito, creado: pagoAlum[j].creado, comentario: pagoAlum[j].comentario })
    }

    let disponible_deposito = 0
    let disponible_retiro = 0
    let disponible = 0

    PagoProf.find({}, (err, pagoProf) => {
         if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

    PagoAlumno.find({ }, (err, pagoAlum) => {
       if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

       for (var i = 0; i < pagoProf.length; i++) {
         disponible_retiro = disponible_retiro + (pagoProf[i].costo + pagoProf[i].comida)
       }
       for (var i = 0; i < pagoAlum.length; i++) {
         disponible_deposito = disponible_deposito + ( pagoAlum[i].costo )
       }
    disponible = disponible_deposito - disponible_retiro

    res.status(200).send({movimiento: fondos, disponible: disponible})
  })
 })
})
})

}

module.exports = {
  buscar
}
