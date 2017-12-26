'use strict'

const Matricula = require("../models/matricula")
const Alumno = require("../models/alumno")
const Profesor = require("../models/profesor")
const PagoProf = require("../models/pagoProfesor")

function buscar(req, res) {
/*  PagoProf.find({ creado: {$gte : req.body.inicio, $lte : req.body.fin} }, (err, prof) => {
      if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
      if(!prof) return res.status(404).send({  nombre: 'Fecha', message: 'Fecha no Tienen Registros'})
*/
  Matricula.find({ pagos: { $match: { $and: [{ creado: { $gte : req.body.inicio } }, { creado: { $lte : req.body.fin } } ] } } }, (err, matri) => {
    if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
    if(!matri) return res.status(404).send({  nombre: 'Fecha', message: 'Fecha no Tienen Registros'})

    res.status(200).send({matri: matri})
  })
//  })


}

module.exports = {
  buscar
}
