const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const app = express();

app.post('/login', ( request, respond ) => {
  let body = request.body;

  Usuario.findOne( { email: body.email }, ( err, usuarioDB) => {

    if ( err ) {
      return respond.status( 500 ).json( {
        ok: false,
        err
      });
    }

    // Si no Existe un usuario 
    if ( !usuarioDB ) {
      return respond.status( 400 ).json( {
        ok: false,
        err: {
          message: 'Email o contraseña incorrecto'
        }
      });
    }

    // Si NO son iguales
    if( !bcrypt.compareSync( body.password, usuarioDB.password ) ) {
      return respond.status( 400 ).json( {
        ok: false,
        err: {
          message: 'Email o Contraseña incorrecto'
        }
      });
    }
    
    let token = jwt.sign( 
      { usuario: usuarioDB },
      process.env.SECRETORPRIVATEKEY,
      { expiresIn: process.env.CADUCIDAD_TOKEN }
    );

    respond.json( {
      ok: true,
      usuario: usuarioDB,
      token
    });

  });

});

module.exports = app;