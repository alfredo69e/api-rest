'use strict'

const User = require('../models/user')
const service = require('../services/user')

function registrar (req, res) {
    const user = new User({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula,
        nivel: req.body.nivel,
        correo: req.body.correo,
        clave: req.body.clave
    })

    user.save((err) => {
        if (err) res.status(500).send({  nombre: 'Ooops...', message: `Error al Crear el Usuario ${err}`})
        return res.status(200).send(true)
    })
}

function login(req, res) {
  let dato = req.body.dato.toLowerCase();
       User.findOne({cedula: dato }, (err, user) => {
           if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
           if(!user){
              User.findOne({ correo: dato }, (err, user) => {
                if(err) return res.status(500).send({  nombre: 'Ooops...', message: err})
                if(!user) return res.status(404).send(false)

                user.compararPassword(req.body.clave, function(err, isMatch) {
                if (err) return res.status(500).send({  nombre: 'Ooops...', message: err})
                if (isMatch) {
                  req.user = user
                  res.status(200).send({
                      valido: true,
                      token: service.createToken(user)
                  })
                }else {
                   return res.status(404).send(false)
                }
                })
              })
           }else{
             user.compararPassword(req.body.clave, function(err, isMatch) {
             if (err) return res.status(500).send({  nombre: 'Ooops...', message: err})
             if (isMatch) {
               req.user = user
               res.status(200).send({
                   valido: true,
                   token: service.createToken(user)
               })
             }else {
                return res.status(404).send(false)
             }
             })
           }
        })
      }
/*
function login(req, res) {
User.findOne({cedula: req.body.dato }, (err, user) => {
    if(err) return res.status(500).send({message: err})
    if(!user) return res.status(404).send(false)
     user.compararPassword(req.body.clave, function(err, isMatch) {
     if (err) return res.status(500).send({message: err})
     if (isMatch) {
       req.user = user
       res.status(200).send({
           valido: true,
           token: service.createToken(user)
       })
     }else {
        return res.status(404).send(false)
     }
   })
 })
      }
*/
function getUsers(req, res) {
  let data = [];
  let j = 0;
    User.find({ }, (err, user) => {
        if (err) return res.status(500).send({  nombre: 'Usuarios', message: err })
        if (!user) return res.status(404).send({ nombre: 'Usuario', message: 'Usuaio no Existen' })

          for (var i = 0; i < user.length; i++) {
          if ( user[i].nivel === 'SOPORTE' ) {
            data[j++] = (user[i])
          }
          }
        res.status(200).send(data)
    })
}

function eliminar(req, res) {
  let userId = req.params.userId
  User.findById(userId, (err, user) => {
      if (err) return res.status(500).send({  nombre: 'Eliminar', message: err })
      if (!user) return res.status(404).send({ message: 'Usuaio no Existen' })

      user.remove(err =>{
          if(err) return res.status(500).send({  nombre: 'Eliminar', massage: `Error al Borrar Usuario:  ${err}`})
          res.status(200).send({ nombre: 'Usuario', message: 'El Usuario se Elimino' })
      })
  })
}

function session(req, res){
    User.findById(req.user, (err, user) => {
      if (err) return res.status(500).send({ nombre: 'Session', message: err })

      res.status(200).send(user);
    })
}

function cambioClave(req, res) {
  let userId = req.params.userId
  User.findById(userId, (err, user) => {
      if (err) return res.status(500).send({  nombre: 'Ooops...', message: err })
      if (!user) return res.status(404).send({ nombre: 'Ooops...', message: 'Usuaio no Existen' })

    user.clave = req.body.clave
    user.save(err => {
      if(err) return res.status(500).send({nombre: 'Ooops...', massage: `Error al Borrar Producto:  ${err}`})
      res.status(200).send({ nombre: 'Clave', message: 'La Clave se cambio correctamente' });
    })

  })
}

function updateUsuario(req, res) {
  let userId = req.params.userId
  User.findById(userId, (err, user) => {
      if (err) return res.status(500).send({  nombre: 'Ooops...', message: err })
      if (!user) return res.status(404).send({ nombre: 'Ooops...', message: 'Usuaio no Existen' })

      user.nombre = req.body.nombre
      user.apellido = req.body.nombre
      user.correo = req.body.nombre
      user.nivel = req.body.nombre

    user.save(err => {
      if(err) return res.status(500).send({nombre: 'Ooops...', massage: `Error al Borrar Producto:  ${err}`})
      res.status(200).send({ nombre: 'Usuario', message: 'El usuario se actualizo' });
    })

  })
}

function validateCorreo(req, res) {
  User.findOne({'correo': req.body.correo }, (err, user) => {
      if (err) return res.status(500).send({  nombre: 'Correo', message: err })
      if (!user) return res.status(200).send(false)
      if (user) return res.status(200).send(true)
  })
}

function validateCedula(req, res) {
  User.findOne({'cedula': req.body.cedula }, (err, user) => {
      if (err) return res.status(500).send({  nombre: 'Cedula', message: err })
      if (!user) return res.status(200).send(false)
      if (user) return res.status(200).send(true)
  })
}

module.exports = {
//singIn,
    session,
    getUsers,
    registrar,
    login,
    eliminar,
    cambioClave,
    updateUsuario,
    validateCorreo,
    validateCedula
}
