'use strict'

const express = require('express')

const auth = require('../middlewares/auth')
const userCtrl = require('../controllers/user')
const profesorCtrl =  require('../controllers/profesor')
const alumnoCtrl =  require('../controllers/alumno')
const MateriaCtrl = require('../controllers/materia')
const MatriculaCtrl = require('../controllers/matricula')
const PagoCtrl = require('../controllers/pago')

const api = express.Router()
// soporte
api.get('/private', auth, function(req, res) {
    res.status(200).send({ message: 'Tienes Acceso' })
})
api.post('/user/registrar', auth, userCtrl.registrar)
api.post('/user/validateCorreo', auth, userCtrl.validateCorreo)
api.post('/user/validateCedula', auth, userCtrl.validateCedula)
api.post('/user/login', userCtrl.login)
//api.post('/user/signup', userCtrl.signUp)
//api.get('/user/singin', userCtrl.singIn)
api.get('/user/', auth, userCtrl.getUsers)
api.delete('/user/:userId', auth, userCtrl.eliminar)
api.get('/user/session', auth, userCtrl.session)
api.put('/user/cambio_clave/:userId', auth, userCtrl.cambioClave)
api.put('/user/update/:userId', auth, userCtrl.updateUsuario)
// fin soporte

// profesor
api.post('/profesor/registrar', auth, profesorCtrl.registrar)
api.get('/profesor/', auth, profesorCtrl.getProfesor)
api.delete('/profesor/:id', auth, profesorCtrl.eliminar)
api.post('/profesor/validateCorreo', auth, profesorCtrl.validateCorreo)
api.post('/profesor/validateCedula', auth, profesorCtrl.validateCedula)
api.put('/profesor/:id', auth, profesorCtrl.editar)
// fin profesor


// alumno
api.post('/alumno/registrar', auth, alumnoCtrl.registrar)
api.get('/alumno/', auth, alumnoCtrl.getAlumno)
api.delete('/alumno/:id', auth, alumnoCtrl.eliminar)
api.post('/alumno/validateCorreo', auth, alumnoCtrl.validateCorreo)
api.post('/alumno/validateCedula', auth, alumnoCtrl.validateCedula)
api.put('/alumno/:id', auth, alumnoCtrl.editar)
// fin alumno

// materia
api.post('/materia/registrar', auth, MateriaCtrl.registrar)
api.get('/materia/', auth, MateriaCtrl.getMateria)
api.delete('/materia/:id', auth, MateriaCtrl.eliminar)
api.put('/materia/:id', auth, MateriaCtrl.editar)
// fin materia


// Matricula
api.post('/matricula/buscar', auth, MatriculaCtrl.buscar)
api.post('/matricula/guardar', auth, MatriculaCtrl.guardar)
api.get('/matricula/', auth, MatriculaCtrl.getMatricula)
api.delete('/matricula/:id', auth, MatriculaCtrl.eliminar)
// fin Matricula

// pagos
api.post('/pago/buscar', auth, PagoCtrl.buscar)
api.post('/pago/', auth, PagoCtrl.guardar)
api.post('/pago/Array', auth, PagoCtrl.eliminarArray)
api.post('/pago/buscarProfesor', auth, PagoCtrl.buscarProf)

// fin pagos

module.exports = api
