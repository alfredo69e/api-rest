'use strict'

const Profesor = require('../models/profesor')
const Alumno = require('../models/alumno')

function getDashboard(req, res) {

  let now = new Date();
  let month = now.getMonth()+1;

  let inicio = new Date(now.getFullYear(), now.getMonth(), '01')
  let fin = new Date(now.getFullYear(), now.getMonth(), '31')

  Profesor.find({ creado: {$gte : inicio, $lte : fin} }, (err, prof) => {
       if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

  Alumno.find({ creado: {$gte : inicio, $lte : fin} }, (err, alum) => {
       if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

    res.status(200).send({ alumno: alum.length, profesor: prof.length});
  })
  })
}

module.exports = {
  getDashboard
}
