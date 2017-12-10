'use strict'

const Matricula = require("../models/matricula")
const Alumno = require("../models/alumno")

function buscar(req, res) {
  let dato = req.body.dato
  let buscar = req.body.buscar.toLowerCase();
  if (dato === 'recibo') {
       Matricula.findOne({ _id: buscar }, (err, matri) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
           if(!matri) return res.status(404).send({  nombre: 'Recibo', message: 'El Recibo no Existe...'})

       Alumno.findOne({ _id: matri.id_alumno }, (err, alum) => {

          res.status(200).send({ recibo: matri, alumno: alum})
       })
    })
  }
  if (dato === 'celular') {
       Alumno.findOne({celular: buscar }, (err, alumno) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
           if(!alumno) return res.status(404).send({  nombre: 'Alumno', message: 'Alumno no Resgitra en Sistema...'})

           res.status(200).send(alumno)
        })
  }
  if (dato === 'correo') {
       Alumno.findOne({correo: buscar }, (err, alumno) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
           if(!alumno) return res.status(404).send({  nombre: 'Alumno', message: 'Alumno no Resgitra en Sistema...'})

           res.status(200).send(alumno)
        })
  }

}

function guardar(req, res) {

}

function eliminar(req, res) {

}


module.exports = {
  buscar,
  guardar,
  eliminar
}
