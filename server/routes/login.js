const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
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

// Configuraciones de Google
async function verify( token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  // payload se obtiene la info de usuario
  const payload = ticket.getPayload();
  // const userid = payload['sub'];

  // console.log(payload.name);
  // console.log(payload.email);
  // console.log(payload.picture);
  return {
    nombre: payload.name,
    email: payload.email,
    img: payload.picture,
    google: true
  }
}


app.post('/google', async( request, respond ) => {

  let token = request.body.idtoken;
  let googleUser = await verify( token ) 
  
    .catch( error => {
      return respond.status(403).json( {
        ok: false,
        err: {
          message: 'verify' + error
        }
      });
    });
  
  // Verificar si el usuario existe en la base de datos
  Usuario.findOne( { email: googleUser.email }, ( err, usuarioDB ) => {

    if ( err) {
      return respond.status(500).json( {
        ok: false,
        err: {
          message: 'Error al intentar encontrar email'
        }
      })
    }
    

    // Si existe un usuario, revisar si esta autenticado con google
    if ( usuarioDB ) {
        
        if ( usuarioDB.google === false ) {
          return respond.status(400).json( {
            ok: false,
            err: {
              message: 'Debe usar su autenticacion normal'
            }
          });
        } else {
          // Es un usuario autenticado con google
          // Crear un token renovar el token
          let token = jwt.sign( { 
            usuario: usuarioDB }, 
            process.env.SECRETORPRIVATEKEY, 
            { expiresIn: process.env.CADUCIDAD_TOKEN } );
  
          return respond.json( {
            ok: true,
            usuario: usuarioDB,
            token
          });
        }
    } else {
      // Si el usuario no existe en la base de datos
      let usuario = new Usuario();
      usuario.nombre = googleUser.nombre;
      usuario.email = googleUser.email;
      usuario.img = googleUser.img;
      usuario.google = true;
      usuario.password = ':)';// No se guarda la contraseña en la base de datos

      // Guardar el usuario en la base de datos
      usuario.save( ( err, usuarioDB ) => {

        if ( err ) {
          return respond.status(500).json( {
            ok: false,
            err: {
              message: 'No fue posible guardar en la base de datos'
            }
          });
        }

        let token = jwt.sign( 
          { usuario: usuarioDB },
          process.env.SECRETORPRIVATEKEY,
          { expiresIn: process.env.CADUCIDAD_TOKEN }
        );

        return respond.json( {
          ok: true,
          usuario: usuarioDB,
          token
        });

      });

    }

  });
  // respond.json( {
  //   ok: true,
  //   // token,
  //   usuario: googleUser   
  // });

});

module.exports = app;