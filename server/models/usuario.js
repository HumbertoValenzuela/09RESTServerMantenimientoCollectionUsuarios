const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// Roles permitidos
let rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El correo es necesario']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: rolesValidos
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

//El método toJSON siempre se llama cuando se intenta imprimir como el post
usuarioSchema.methods.toJSON = function() {//function porque se necesita el this
  let user = this;//this lo quese a que tenga en el momento
  let userObject = user.toObject();//se tiene todas las propiedades y métodos

  delete userObject.password;

  return userObject;

}

usuarioSchema.plugin( uniqueValidator, { message: '{PATH} debe de ser único'} );
module.exports = mongoose.model( 'Usuario', usuarioSchema );