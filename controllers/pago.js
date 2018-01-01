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
       Alumno.findOne({celular: buscar }, (err, alum) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
           if(!alum) return res.status(404).send({  nombre: 'Alumno', message: 'Alumno no Resgitra en Sistema...'})

      Matricula.find({id_alumno: alum._id }, (err, matri) => {
         if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

        let datos = matri.pop()

      Matricula.findById(datos._id, (err, matric) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

      PagoAlumno.find({ id: matric._id }, (err, pago) => {
               if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

               res.status(200).send({ recibo: matric, alumno: alum, pago: pago})

      })
      })
      })
    })
  }
  if (dato === 'cedula') {
    Alumno.findOne({cedula: buscar }, (err, alum) => {
        if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
        if(!alum) return res.status(404).send({  nombre: 'Alumno', message: 'Alumno no Resgitra en Sistema...'})

   Matricula.find({id_alumno: alum._id }, (err, matri) => {
      if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

     let datos = matri.pop()

   Matricula.findById(datos._id, (err, matric) => {
        if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

   PagoAlumno.find({ id: matric._id }, (err, pago) => {
            if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

            res.status(200).send({ recibo: matric, alumno: alum, pago: pago})

   })
   })
   })
 })
  }

   if (dato === 'correo') {
     Alumno.findOne({correo: buscar }, (err, alum) => {
         if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
         if(!alum) return res.status(404).send({  nombre: 'Alumno', message: 'Alumno no Resgitra en Sistema...'})

    Matricula.find({id_alumno: alum._id }, (err, matri) => {
       if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

      let datos = matri.pop()

    Matricula.findById(datos._id, (err, matric) => {
         if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

    PagoAlumno.find({ id: matric._id }, (err, pago) => {
             if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

             res.status(200).send({ recibo: matric, alumno: alum, pago: pago})

    })
    })
    })
  })
  }

}

function guardar(req, res) {
  let valido = true;
  let pagosRealizados = 0;

      let pagoAlumno = new PagoAlumno({
			id: req.body.pago.recibo._id,
			costo: req.body.regPago.costo,
			comentario: req.body.regPago.comentario,
      usuario: req.user
			})

      pagoAlumno.save((err, pago) =>{
        if(err) return res.status(500).send({nombre: 'Oops...', massage: `Error al realizar El Pago:  ${err}`})

      PagoAlumno.find({ id: pago.id  }, (err, pagos) => {
          if(err) return res.status(500).send({nombre: 'Oops...', massage: `Error al realizar El Pago:  ${err}`})

          for (var i = 0; i < pagos.length; i++) {
              pagosRealizados = pagosRealizados + pagos[i].costo
              if ( pagosRealizados === req.body.pago.recibo.costo ) {
                valido = false;
              }
          }

      if (valido){
          res.status(200).send({ nombre: 'Pago', message: 'El Pago se Realizo Correctamente'});
      }else {
        Matricula.update({ _id: req.body.pago.recibo._id }, { finalizo: 'SI' }, (err, matri) => {
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



function buscarProf(req, res){
  let dato = req.body.dato
  let buscar = req.body.buscar.toLowerCase();
  if (dato === 'cedula') {
       Profesor.findOne({cedula: buscar }, (err, prof) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
           if(!prof) return res.status(404).send({  nombre: 'Profesor', message: 'Cedula no Resgitra en Sistema...'})

      PagoProf.find({ id:  prof._id}, (err, pagos) => {
             if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

             res.status(200).send({ prof: prof,
                                    pagos: pagos
                                  })
      })


        })
  }
  if (dato === 'celular') {
       Profesor.findOne({celular: buscar }, (err, prof) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
           if(!prof) return res.status(404).send({  nombre: 'Alumno', message: 'Celular no Resgitra en Sistema...'})

           PagoProf.find({id: prof._id}, (err, pagos) => {
                  if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

                  res.status(200).send({ prof: prof,
                                         pagos: pagos
                                       })
           })
        })
  }
  if (dato === 'correo') {
       Profesor.findOne({correo: buscar }, (err, prof) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
           if(!prof) return res.status(404).send({  nombre: 'Alumno', message: 'Correo no Resgitra en Sistema...'})

       PagoProf.find({ id:  prof._id}, (err, pagos) => {
          if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})

                  res.status(200).send({ prof: prof,
                                         pagos: pagos
                                       })
           })
        })
  }
}


function eliminarArray(req, res) {

  PagoAlumno.findById(req.params.id, (err, pagoAlum) => {
   if(err) return res.status(500).send({nombre: 'Oops...', massage: `Error al Actualizar el Pago:  ${err}`})
   if (!pagoAlum) return res.status(404).send({ nombre: 'Ooops...', message: 'Pago no Existe' })

  Matricula.update({_id: pagoAlum.id }, { finalizo: 'NO' }, (err, matri) => {
    if(err) return res.status(500).send({massage: `Error al Actualizar el Alumno:  ${err}`})

  pagoAlum.remove((err ) => {
    if(err) return res.status(500).send({massage: `Error al Eliminar el Pago:  ${err}`})
    res.status(200).send({ nombre: 'Pago', message: 'El Pago se Elimino Correctamente' });
  })
  })
  })
}

function eliminarPagoProf(req, res) {

  PagoProf.findOne({ _id: req.params.id}, (err, profPago) => {
   if(err) return res.status(500).send({nombre: 'Oops...', massage: `Error al Eliminar El Pago:  ${err}`})
   if (!profPago) return res.status(404).send({ nombre: 'Ooops...', message: 'Pago no Existe' })

  profPago.remove((err) => {
    if(err) return res.status(500).send({massage: `Error al Eliminar El Pago:  ${err}`})
    res.status(200).send({ nombre: 'Pago', message: 'Se Elimino Correctamente' });
  })
  })
}

function varios(req, res) {

  let pago = new PagoProf({
    id: 'varios',
    comentario:  req.body.comentario,
    costo: req.body.costo,
    comida: 0,
  })
  pago.save((err) => {
      if(err) return res.status(500).send({ nombre: 'Ooops...', message: `Error al registrar el Pago: ${err}`})
      res.status(200).send({ nombre: 'Pago', message: 'Se registro correctamente' })
  })
}

function getVarios(req, res) {
  PagoProf.find({id: 'varios'}, (err, varios) => {
    if(err) return res.status(500).send({ nombre: 'Ooops...', message: `Error al Buscar los Pagos: ${err}`})

    res.status(200).send(varios);
  })
}

module.exports = {
  buscar,
  guardar,
  eliminarArray,
  buscarProf,
  guardarProf,
  eliminarPagoProf,
  varios,
  getVarios
}
