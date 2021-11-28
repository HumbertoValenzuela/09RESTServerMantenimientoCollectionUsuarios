const express = require('express');

// Requiere que el usuario este autenticado
let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');

// Mostrar todas las categorias
app.get('/categoria', verificaToken, (req, res) => {
  
  Categoria.find({})
    .sort('descripcion')
    .populate('usuario', 'nombre email')
    .exec( ( err, categorias ) => {
      if ( err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json( {
        ok: true,
        categorias
      });
    });


});

// Mostrar una categoria por id
app.get('/categoria/:id', verificaToken, (req, res) => {
  Categoria.findById( req.params.id, ( err, categoriaDB) => {
    if( err ) {
      return res.status(500).json( {
        ok: false,
        err
      });
    }

    if( !categoriaDB ) {
      return res.status(400).json( {
        ok:false,
        err: {
          message: 'El id no Existe'          
        }
      });
    }

    res.json( {
      ok: true,
      categoria: categoriaDB
    })

  } ) .populate('usuario', 'nombre email');
  
});

// Crear una categoria
// verificaToken se obtiene el req.usuario._id
app.post('/categoria', verificaToken, (req, res) => {
  
  let body = req.body;

  // console.log(body);

  let categoria = new Categoria({
    descripcion: body.descripcion,
    usuario: req.usuario._id
  });

  // Grabar en la base de datos.
  categoria.save( ( err, categoriaDB ) => {

    if( err ) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if( !categoriaDB ) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    // Obtener el resultado
    res.json({
      ok: true,
      categoria: categoriaDB
    });

  });
  // res.json('post usuario');
});

app.put('/categoria/:id', verificaToken, function (req, res) {

  let id = req.params.id;
  let body = req.body; 

  let descCategoria = {
    descripcion: body.descripcion
  };
  
    Categoria.findByIdAndUpdate( id, descCategoria, { new: true, runValidators: true}, ( err, categoriaDB ) => {
    if ( err ) {
      return res.status( 400 ).json( {
        ok: false,
        err
      });
    }

    if( !categoriaDB ) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({ 
      //id //id: id "id": "123456"
      ok: true,
      categoria: categoriaDB
    });
  })
});

app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], function (req, res) {
  // Sólo un administrador puede borrar categorías
  let id = req.params.id;

  Categoria.findByIdAndRemove( id, ( err, categoriaBorrada ) => {

    if( err ) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if( !categoriaBorrada ) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'El id no existe'
        }
      });
    }

    res.json({
      ok: true,
      message: 'Categoria Borrada'
    });

  } );

});


module.exports = app;