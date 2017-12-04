'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({
    nombre: String,
    apellido: String,
    cedula: { type: String, unique: true, lowercase: true },
    nivel: String,
    correo: {type: String, unique: true, lowercase: true},
    clave: { type: String /*, select: false */},
    creado: { type:Date, default: Date.now },
    ultimologin: Date
})

UserSchema.pre('save', function(next) {
    let user = this
    if (!user.isModified('clave')) return next()

    bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

        bcrypt.hash(user.clave, salt, null, (err, hash) => {
            if (err) return next(err)
            user.clave = hash
            next()
        })

    })

})

UserSchema.methods.compararPassword = function(clave, cb) {
  bcrypt.compare(clave, this.clave, (err, sonIguales) => {
    if(err) return cb(err)
    cb(null, sonIguales)
  })
}

UserSchema.methods.gravatar = function(){
    if(!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`
    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
}




module.exports = mongoose.model('User', UserSchema)
