'use strict'

const Matricula = require("../models/matricula")
const Alumno = require("../models/alumno")


function buscar(req, res){
  let dato = req.body.dato
  let buscar = req.body.buscar.toLowerCase();
  if (dato === 'cedula') {
       Alumno.findOne({cedula: buscar }, (err, alumno) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
           if(!alumno) return res.status(404).send({  nombre: 'Alumno', message: 'Alumno no Resgitra en Sistema...'})

      Matricula.find({id_alumno: alumno._id}, (err, matri) => {
          if(err) return res.status(500).send({ nombre: 'Ooops...', message: err})

        res.status(200).send({alumno: alumno, matri: matri})
      })


        })
  }
  if (dato === 'celular') {
    Alumno.findOne({celular: buscar }, (err, alumno) => {
        if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
        if(!alumno) return res.status(404).send({  nombre: 'Alumno', message: 'Alumno no Resgitra en Sistema...'})

   Matricula.find({id_alumno: alumno._id}, (err, matri) => {
       if(err) return res.status(500).send({ nombre: 'Ooops...', message: err})

     res.status(200).send({alumno: alumno, matri: matri})
      })
     })
  }
  if (dato === 'correo') {
    Alumno.findOne({correo: buscar }, (err, alumno) => {
        if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
        if(!alumno) return res.status(404).send({  nombre: 'Alumno', message: 'Alumno no Resgitra en Sistema...'})

   Matricula.find({id_alumno: alumno._id}, (err, matri) => {
       if(err) return res.status(500).send({ nombre: 'Ooops...', message: err})

     res.status(200).send({alumno: alumno, matri: matri})
   })


     })
  }
}

function guardar(req, res){

  Matricula.find({ id_alumno: req.body.alumno._id }, (err, matri) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
    if(matri.length === 0){

      let matricula = new Matricula({
			id_alumno: req.body.alumno._id,
			matricula: [{ nivel:  req.body.nivel,
                  cuatrimestre: req.body.ano_curso,
                   materias: req.body.materias
                }],
			usuario: req.user,
			finalizo: 'NO',
      costo: req.body.costo
			})

      matricula.save((err, matri) => {
  		if(err) res.status(500).send({ nombre: 'Ooops...', message: `Error al registrar la Matricula: ${err}`})

  		res.status(200).send({nombre: 'Matricula',
  								message: `La Inscripcion de Realizo Corretamente Numero del Recibo es: ${matri._id}`})
  		})

    }else {

		let datos = matri.pop()

if (datos.finalizo === 'SI'){

  let matricula = new Matricula({
  id_alumno: req.body.alumno._id,
  matricula: [{ nivel:  req.body.nivel,
              cuatrimestre: req.body.ano_curso,
               materias: req.body.materias
            }],
  usuario: req.user,
  finalizo: 'NO',
  costo: req.body.costo
  })

		matricula.save((err, matri) => {
		if(err) res.status(500).send({ nombre: 'Ooops...', message: `Error al registrar la Matricula: ${err}`})

		res.status(200).send({nombre: 'Matricula',
								message: `La Inscripcion de Realizo Corretamente Numero del Recibo es: ${matri._id}`})
		})
		}else{
			res.status(404).send({nombre: 'Alumno',
                            message: `El Alumno no A terminado de Pagar la Matricula N°: ${datos._id}`})
		}
    }
	 })


}

function getMatricula(req, res) {
  Matricula.find({ }, (err, matri) => {
      if (err) return res.status(500).send({  nombre: 'Ooops...', message: err })
      if (!matri) return res.status(404).send({ nombre: 'Matriculas', message: 'No hay Matricula Registrada' })

      res.status(200).send(matri)
  })
}

function eliminar(req, res) {
  let id = req.params.id
  Matricula.findById(id, (err, matri) => {
      if (err) return res.status(500).send({  nombre: 'Eliminar', message: err })
      if (!matri) return res.status(404).send({ nombre: 'Ooops...' , message: 'Matricula no Existe' })

      matri.remove(err =>{
          if(err) return res.status(500).send({  nombre: 'Eliminar', massage: `Error al Borrar la Matricula:  ${err}`})
          res.status(200).send({ nombre: 'Matricula', message: 'La Matricula se Elimino' })
      })
  })
}



module.exports = {
  buscar,
  guardar,
  getMatricula,
  eliminar,

}
