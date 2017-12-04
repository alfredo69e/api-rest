'use strict'

const Alumno = require("../models/alumno");

function registrar(req, res) {
  let alumno = new Alumno({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    cedula: req.body.cedula,
    tlf: req.body.tlf,
    celular: req.body.celular,
    correo: req.body.correo,
    direccion: req.body.direccion
  })

  alumno.save((err, alun) => {
      if(err) res.status(500).send({ nombre: 'Ooops...', message: `Error al registrar al Alumno: ${err}`})

      res.status(200).send({ nombre: 'Alumno', message: 'Se registro correctamente' })
  })
}

function getAlumno(req, res){
  Alumno.find({ }, (err, alun) => {
      if (err) return res.status(500).send({  nombre: 'Ooops...', message: err })
      if (!alun) return res.status(404).send({ nombre: 'Alumno', message: 'Alumno no Existen' })

      res.status(200).send(alun)
  })
}

function eliminar(req, res) {
  let id = req.params.id
  Alumno.findById(id, (err, alun) => {
      if (err) return res.status(500).send({  nombre: 'Eliminar', message: err })
      if (!alun) return res.status(404).send({ nombre: 'Ooops...' , message: 'Alumno no Existen' })

      alun.remove(err =>{
          if(err) return res.status(500).send({  nombre: 'Eliminar', massage: `Error al Borrar al Alumno:  ${err}`})
          res.status(200).send({ nombre: 'Alumno', message: 'El Alumno se Elimino' })
      })
  })
}

function validateCorreo(req, res) {
  Alumno.findOne({ 'correo': req.body.correo }, (err, alun) => {
      if (err) return res.status(500).send({  nombre: 'Correo', message: err })
      if (!alun) return res.status(200).send(false)
      if (alun) return res.status(200).send(true)
  })
}

function validateCedula(req, res) {
  Alumno.findOne({ 'cedula': req.body.cedula }, (err, alun) => {
      if (err) return res.status(500).send({  nombre: 'Cedula', message: err })
      if (!alun) return res.status(200).send(false)
      if (alun) return res.status(200).send(true)
  })
}

function editar(req, res) {
  let id = req.params.id
  let update = req.body

  Alumno.findOneAndUpdate(id, update, (err, alun) => {
   if(err) return res.status(500).send({massage: `Error al Actualizar el Alumno:  ${err}`})
   res.status(200).send({ nombre: 'Alumno', message: 'Se actulizo correctamente' });
      })

}

module.exports = {
  registrar,
  getAlumno,
  eliminar,
  validateCorreo,
  validateCedula,
  editar
}
