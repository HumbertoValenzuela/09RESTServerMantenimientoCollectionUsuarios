const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();

app.get('/', function (req, res) {
  // res.send('Hello World')
  res.json('Hello World')
});

app.get('/usuario', verificaToken, function (req, res) {


  // return res.json({
  //   usuario: req.usuario,
  //   email: req.usuario.email
  // });
  
  //Enviar  Parametros
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 14;
  limite = Number(limite);

  Usuario.find( {estado: true}, 'nombre email role estado google img' ) //trae todos los registros
    .skip(desde) //salte los primeros 5 registros 
    .limit(limite) //maximo 5 registro
    .exec( ( err, usuarios ) => {//exec ejecutalo
      if ( err ) {
        return res.status(400).json( { 
          ok: false,
          err
        } );
      }

      // Contar registros
      Usuario.count( {estado: true}, ( err, conteo ) => {

        res.json( {
          ok: true,
          usuarios,
          cuantos: conteo
        })
      });

    }) 
  // res.send('Hello World')
  // res.json('get usuario')
});

app.post('/usuario', [verificaToken, verificaAdmin_Role], function (req, res) {

  let body = req.body;//Primero pasa por el body-parser. recibe cualquier payload funciona para post put y delete 
  // res.json('post usuario');

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10) ,
    role: body.role,
    estado: body.estado,
    google: body.google,
  });

  // Grabar en la base de datos. save palabra reservada de mongoose
  usuario.save( ( err, usuarioDB ) => {

    if ( err ) {
      // Termina si tiene un error
      return res.status( 400 ).json( {
        ok: false,
        err
      });
    }

    // obtener el resultado
    res.json( {
      ok: true,
      usuario: usuarioDB
    } );

  })

  // if( body.nombre === undefined ) {
  //   res.status( 400 ).json( {
  //     ok:false,
  //     mensaje: 'El nombre es necesario'
  //   });
  // } else {    
  //   res.json( {
  //     persona: body
  //   } );
  // }
});

app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], function (req, res) {

  // let body = req.body;
  let body = _.pick( req.body,  ['nombre','email','img','role','estado']) ;
  let id = req.params.id;
  // res.send('Hello World') 

    Usuario.findByIdAndUpdate( id, body, { new: true, runValidators: true}, ( err, usuarioDB ) => {
    if ( err ) {
      return res.status( 400 ).json( {
        ok: false,
        err
      });
    }
    res.json({ 
      //id //id: id "id": "123456"
      ok: true,
      usuario: usuarioDB
    })
  })
});

// Cambiar el estado a false
app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], function (req, res) {
  // res.send('Hello World')
  // res.json('delete usuario')

  let id = req.params.id;
  let cambiaEstado = {
    estado: false
  };

  Usuario.findByIdAndUpdate( id, cambiaEstado, { new: true }, ( err, usuarioBorrado ) => {
    if ( err ) {
      return res.status( 400 ).json( {
        ok: false,
        err
      });
    }

    // Si no Existe un usuario borrado
    if ( !usuarioBorrado ) {
      return res.status( 400 ).json( {
        ok: false,
        err: {
          message: 'Usuario no encontrado'
        }
      });
    }

    res.json( {
      ok: true,
      usuario: usuarioBorrado
    })
  })
});

// Borrar de la base de datos
// app.delete('/usuario/:id', function (req, res) {
//   // res.send('Hello World')
//   // res.json('delete usuario')

//   let id = req.params.id;
//   Usuario.findByIdAndRemove( id, ( err, usuarioBorrado ) => {
//     if ( err ) {
//       return res.status( 400 ).json( {
//         ok: false,
//         err
//       });
//     }

//     // Si no Existe un usuario borrado
//     if ( !usuarioBorrado ) {
//       return res.status( 400 ).json( {
//         ok: false,
//         err: {
//           message: 'Usuario no encontrado'
//         }
//       });
//     }

//     res.json( {
//       ok: true,
//       usuario: usuarioBorrado
//     })
//   })
// });

module.exports = app;