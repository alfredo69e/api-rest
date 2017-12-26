'use strict'

const Profesor = require("../models/profesor");

function registrar(req, res) {
  let prof = new Profesor({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    cedula: req.body.cedula,
    tlf: req.body.tlf,
    celular: req.body.celular,
    correo: req.body.correo,
    direccion: req.body.direccion
  })

  prof.save((err, profesor) => {
      if(err) res.status(500).send({ nombre: 'Ooops...', message: `Error al registrar al profesor: ${err}`})

      res.status(200).send({ nombre: 'Profesor', message: 'Se registro correctamente' })
  })
}

function getProfesor(req, res){
  Profesor.find({ }, (err, prof) => {
      if (err) return res.status(500).send({  nombre: 'Ooops...', message: err })
      if (!prof) return res.status(404).send({ nombre: 'Profesor', message: 'Profesor no Existen' })

      res.status(200).send(prof)
  })
}

function eliminar(req, res) {
  let id = req.params.id
  Profesor.findById(id, (err, prof) => {
      if (err) return res.status(500).send({  nombre: 'Eliminar', message: err })
      if (!prof) return res.status(404).send({ nombre: 'Ooops...' , message: 'Profesor no Existen' })

      prof.remove(err =>{
          if(err) return res.status(500).send({  nombre: 'Eliminar', massage: `Error al Borrar al Profesor:  ${err}`})
          res.status(200).send({ nombre: 'Profesor', message: 'El Profesor se Elimino' })
      })
  })
}

function validateCorreo(req, res) {
  Profesor.findOne({ correo: req.body.correo }, (err, prof) => {
      if (err) return res.status(500).send({  nombre: 'Correo', message: err })
      if (!prof) return res.status(200).send(false)
      if (prof) return res.status(200).send(true)
  })
}

function validateCedula(req, res) {
  Profesor.findOne({ cedula: req.body.cedula }, (err, prof) => {
      if (err) return res.status(500).send({  nombre: 'Cedula', message: err })
      if (!prof) return res.status(200).send(false)
      if (prof) return res.status(200).send(true)
  })
}

function validateCelular(req, res) {
  Profesor.findOne({ celular: req.body.celular }, (err, prof) => {
      if (err) return res.status(500).send({  nombre: 'Celular', message: err })
      if (!prof) return res.status(200).send(false)
      if (prof) return res.status(200).send(true)
  })
}

function editar(req, res) {
  let id = req.params.id
  let update = req.body

  Profesor.findOneAndUpdate(id, update, (err, prof) => {
   if(err) return res.status(500).send({massage: `Error al Actualizar el Profesor:  ${err}`})
   res.status(200).send({ nombre: 'Profesor', message: 'Se actulizo correctamente' });
      })

}



module.exports = {
  registrar,
  getProfesor,
  eliminar,
  validateCorreo,
  validateCedula,
  validateCelular,
  editar
}
