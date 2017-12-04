'use strict'

const Materia = require('../models/materia')

function registrar(req, res) {
   let materia = new Materia({
        nombre: req.body.nombre,
        unidad_credito: req.body.uc,
        nivel: req.body.nivel,
        ano_curso: req.body.ano_curso
   })

   materia.save((err, mat) =>{
      if(err) return res.status(500).send({ nombre: 'Ooops...', message: `Error al Registrar la materia: ${err}`  })

      res.status(200).send({ nombre:'Materia', message: 'Resgistrada correctamente'})
   })

}

function getMateria(req, res) {
    Materia.find({}, (err, mat) => {
      if (err) return res.status(500).send({  nombre: 'Ooops...', message: err })
      if (!mat) return res.status(404).send({ nombre: 'Materia', message: 'Materias no Existen' })

      res.status(200).send(mat)

    })
}

function editar(req, res) {
  let id = req.params.id
  Materia.findById(id, (err, mat) => {
   if(err) return res.status(500).send({nombre: 'Oops...', massage: `Error al Actualizar la Materia:  ${err}`})
   if (!mat) return res.status(404).send({ nombre: 'Ooops...', message: 'Materia no Existen' })

   mat.nombre = req.body.nombre
   mat.unidad_credito = req.body.unidad_credito
   mat.nivel = req.body.nivel
   mat.ano_curso = req.body.ano_curso

   mat.save(err => {
     if(err) return res.status(500).send({nombre: 'Ooops...', massage: `Error al Borrar Producto:  ${err}`})
     res.status(200).send({ nombre: 'Materia', message: 'Se actulizo correctamente' })
   })

})
}

function eliminar(req, res) {
  let id = req.params.id
  Materia.findById(id, (err, mat) => {
      if (err) return res.status(500).send({  nombre: 'Eliminar', message: err })
      if (!mat) return res.status(404).send({ nombre: 'Ooops...' , message: 'Materia no Existen' })

      mat.remove(err =>{
          if(err) return res.status(500).send({  nombre: 'Eliminar', massage: `Error al Borrar la Materia:  ${err}`})
          res.status(200).send({ nombre: 'Materia', message: 'Se Elimino correctamente' })
      })
  })
}


module.exports = {
  getMateria,
  registrar,
  eliminar,
  editar
}
