'use strict'

const Matricula = require("../models/matricula")
const Alumno = require("../models/alumno")
const Profesor = require("../models/profesor")

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
			   
       Matricula.find({ id_alumno: alumno._id }, (err, matri) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
           if(!matri) return res.status(404).send({  nombre: 'Matricula', message: 'El alumno no tiene Matricula Inscritra...'})
			   
		console.log(matri)
		let datos = matri.pop()
		console.log('datos: ' + datos)
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
  let id = req.body.recibo._id
  let pago = req.body.cobro
  if (pago.id == '7') {

    Matricula.findOne({ _id: id}, (err, matri) => {
     if(err) return res.status(500).send({nombre: 'Oops...', massage: `Error al Actualizar la Matricula:  ${err}`})
     if (!matri) return res.status(404).send({ nombre: 'Ooops...', message: 'Matricula no Existen' })

     matri.update({ finalizo: 'SI', $push: { pagos: { id: pago.id, nombre: pago.nombre, costo: pago.costo   } } }, (err, matri) => {
       if(err) return res.status(500).send({massage: `Error al Actualizar la Matricula:  ${err}`})

       res.status(200).send({ nombre: 'Pago', message: 'El Pago se Realizo Correctamente'});
     })
   })
}else {

  Matricula.findOne( { _id: id}, (err, matri) => {
   if(err) return res.status(500).send({nombre: 'Oops...', massage: `Error al Actualizar la Matricula:  ${err}`})
   if (!matri) return res.status(404).send({ nombre: 'Ooops...', message: 'Matricula no Existen' })

   matri.update({ finalizo: 'NO', $push: { pagos: { id: pago.id, nombre: pago.nombre, costo: pago.costo   } } }, (err, matri) => {
     if(err) return res.status(500).send({massage: `Error al Actualizar la Matricula:  ${err}`})

     res.status(200).send({ nombre: 'Pago', message: 'El Pago se Realizo Correctamente'});
   })
   })
}

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

           res.status(200).send(prof)
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

module.exports = {
  buscar,
  guardar,
  eliminar,
  eliminarArray,
  buscarProf
}
