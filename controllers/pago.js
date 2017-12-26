'use strict'

const Matricula = require("../models/matricula")
const Alumno = require("../models/alumno")
const Profesor = require("../models/profesor")
const PagoProf = require("../models/pagoProfesor")
const PagoAlumno = require("../models/pagoAlumno")

function buscar(req, res) {
  let dato = req.body.dato
  let buscar = req.body.buscar.toLowerCase();

  if (dato === 'recibo') {
       Matricula.findOne({ _id: buscar }, (err, matri) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
           if(!matri) return res.status(404).send({  nombre: 'Recibo', message: 'El Recibo no Existe...'})

      PagoAlumno.find({ id: matri._id }, (err, pago) => {
          if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

      Alumno.findOne({ _id: matri.id_alumno }, (err, alum) => {
            if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

             res.status(200).send({ recibo: matri, alumno: alum, pago: pago})
           })
       })
    })
  }
  if (dato === 'celular') {
       Alumno.findOne({celular: buscar }, (err, alumno) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
           if(!alumno) return res.status(404).send({  nombre: 'Alumno', message: 'Alumno no Resgitra en Sistema...'})

       Matricula.find({ id_alumno: alumno._id }, (err, matri) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
           if(!matri) return res.status(404).send({  nombre: 'Matricula', message: 'El alumno no tiene Matricula Inscritra...'})

    let datos = matri.pop()
		let recibo = datos._id

		Matricula.findOne({_id: recibo}, (err, matri) => {
			 if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

			res.status(200).send({ recibo: matri, alumno: alumno})
		})
		})
        })
  }
  if (dato === 'cedula') {
             Alumno.findOne({cedula: buscar }, (err, alumno) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
           if(!alumno) return res.status(404).send({  nombre: 'Alumno', message: 'Alumno no Resgitra en Sistema...'})

       Matricula.find({ id_alumno: alumno._id }, (err, matri) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
           if(!matri) return res.status(404).send({  nombre: 'Matricula', message: 'El alumno no tiene Matricula Inscritra...'})

		let datos = matri.pop()
		let recibo = datos._id

		Matricula.findOne({_id: recibo}, (err, matri) => {
			 if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

			res.status(200).send({ recibo: matri, alumno: alumno})
		})
		})
        })
  }

   if (dato === 'correo') {
             Alumno.findOne({correo: buscar }, (err, alumno) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
           if(!alumno) return res.status(404).send({  nombre: 'Alumno', message: 'Alumno no Resgitra en Sistema...'})

       Matricula.find({ id_alumno: alumno._id }, (err, matri) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
           if(!matri) return res.status(404).send({  nombre: 'Matricula', message: 'El alumno no tiene Matricula Inscritra...'})

		let datos = matri.pop()
		let recibo = datos._id

		Matricula.findOne({_id: recibo}, (err, matri) => {
			 if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

			res.status(200).send({ recibo: matri, alumno: alumno})
		})
		})
        })
  }

}

function guardar(req, res) {

  let valido = true;
  let pagosRealizados = 0;

      let pagoAlumno = new PagoAlumno({
			id: req.body.recibo._id,
			costo: req.body.regPago.costo,
			comentario: req.body.regPago.comentario,
			})

      pagoAlumno.save((err, pago) =>{
        if(err) return res.status(500).send({nombre: 'Oops...', massage: `Error al realizar El Pago:  ${err}`})

      PagoAlumno.find({ id: pago.id  }, (err, pagos) => {
          if(err) return res.status(500).send({nombre: 'Oops...', massage: `Error al realizar El Pago:  ${err}`})

          for (var i = 0; i < pagos.length; i++) {
              pagosRealizados = pagosRealizados + pagos[i].costo
              if ( pagosRealizados === req.body.recibo.costo ) {
                valido = false;
              }
          }

      if (valido){
          res.status(200).send({ nombre: 'Pago', message: 'El Pago se Realizo Correctamente'});
      }else {
        Matricula.update({ _id: req.body.recibo._id }, { finalizo: 'SI' }, (err, matri) => {
            if(err) return res.status(500).send({nombre: 'Oops...', massage: `Error al realizar El Pago:  ${err}`})

          res.status(200).send({ nombre: 'Pago', message: 'El Pago se Realizo Correctamente y es el Ultimo'});

        })
      }
      })
      })


}

function guardarProf(req, res) {

  Profesor.findOne({ _id: req.body.prof._id}, (err, prof) => {
   if(err) return res.status(500).send({nombre: 'Oops...', massage: `Error al Actualizar la Matricula:  ${err}`})
   if (!prof) return res.status(404).send({ nombre: 'Ooops...', message: 'Profesor no Existen' })

   let pago = new PagoProf({
     id: prof._id,
     comentario:  req.body.pagar.comentario,
     costo: req.body.pagar.costo,
     comida: req.body.pagar.comida,
   })

   pago.save((err, pagoProf) => {
       if(err) return res.status(500).send({ nombre: 'Ooops...', message: `Error al registrar el Pago: ${err}`})

       res.status(200).send({ nombre: 'Pago de Profesor', message: 'Se registro correctamente' })
   })
   })

}

function eliminar(req, res) {

}

function buscarProf(req, res){
  let dato = req.body.dato
  let buscar = req.body.buscar.toLowerCase();
  if (dato === 'cedula') {
       Profesor.findOne({cedula: buscar }, (err, prof) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
           if(!prof) return res.status(404).send({  nombre: 'Profesor', message: 'Cedula no Resgitra en Sistema...'})

      PagoProf.find({ id:  prof._id}, (err, pagos) => {
             if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

             res.status(200).send({ 'prof': prof,
                                    'pagos': pagos
                                  })
      })


        })
  }
  if (dato === 'celular') {
       Profesor.findOne({celular: buscar }, (err, prof) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
           if(!prof) return res.status(404).send({  nombre: 'Alumno', message: 'Celular no Resgitra en Sistema...'})

           res.status(200).send(prof)
        })
  }
  if (dato === 'correo') {
       Profesor.findOne({correo: buscar }, (err, prof) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
           if(!prof) return res.status(404).send({  nombre: 'Alumno', message: 'Correo no Resgitra en Sistema...'})

           res.status(200).send(prof)
        })
  }
}


function eliminarArray(req, res) {
  let id = req.body.select.buscar
  let idArray = req.body.data.id
  Matricula.findOne( { _id: id}, (err, matri) => {
   if(err) return res.status(500).send({nombre: 'Oops...', massage: `Error al Actualizar la Matricula:  ${err}`})
   if (!matri) return res.status(404).send({ nombre: 'Ooops...', message: 'Matricula no Existen' })

  matri.update({ finalizo: 'NO', $pull: { pagos: { id:  idArray  } } }, (err, matri) => {
    if(err) return res.status(500).send({massage: `Error al Actualizar el Alumno:  ${err}`})
    res.status(200).send({ nombre: 'Pago', message: 'El Pago se Elimino Correctamente' });
  })
  })
}

function eliminarPagoProf(req, res) {
  let _id = req.body.prof._id
  let id = req.body.data._id
  Profesor.findOne( { _id: _id}, (err, prof) => {
   if(err) return res.status(500).send({nombre: 'Oops...', massage: `Error al Actualizar la Matricula:  ${err}`})
   if (!prof) return res.status(404).send({ nombre: 'Ooops...', message: 'Pago no Existe' })

  prof.update({ $pull: { pago: { _id:  id  } } }, (err, prof) => {
    if(err) return res.status(500).send({massage: `Error al Actualizar el Alumno:  ${err}`})
    res.status(200).send({ nombre: 'Pago', message: 'El Pago se Elimino Correctamente' });
  })
  })
}

module.exports = {
  buscar,
  guardar,
  eliminar,
  eliminarArray,
  buscarProf,
  guardarProf,
  eliminarPagoProf
}
