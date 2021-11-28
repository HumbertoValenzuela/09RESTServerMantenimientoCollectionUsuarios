const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');

let app = express();
let Producto = require('../models/producto');

app.get('/producto', verificaToken, (req, res) => {


  // query Ocional
  let desde = req.query.desde || 0;
  // Los query siempre viene en formato String
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  // Cargar todo los Producto usando el Schema
  Producto.find( { disponible: true } )
    .skip(desde)
    .limit(limite)
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion')
    .exec( ( err, productos) => {
       if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(200).json( {
          ok: true,
          productos
        });
    })


  //       Producto.countDocuments({ disponible: true }, (err, conteo) => {
  //           res.json({
  //               ok: true,
  //               productos,
  //               cuantos: conteo
  //           });
  //       });
  //     });
});

// Buscar Producto
app.get('/producto/buscar/:termino', verificaToken, ( req, res) => {
  
  let termino = req.params.termino;

  // Busqueda flexible usando expresiones regulares
  let regex = new RegExp(termino, 'i');

  // Producto.find( { nombre: termino } )
    Producto.find( { nombre: regex } )
    .populate('categoria', 'nombre')
    .exec( ( err, productos) => {
      if (err) {
        return res.status(500).json({
            ok: false,
            err
        });
      }

      res.status(200).json( {
        ok: true,
        productos
      });
    })
});

app.get('/producto/:id', verificaToken, (req, res) => {
  let id = req.params.id;

  Producto.findById(id)
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion')
    .exec((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });
});

app.post('/producto', verificaToken, (req, res) => {
   
  let body = req.body;

  let producto = new Producto({
    nombre: body.nombre,
    precioUni: body.precioUni,
    descripcion: body.descripcion,
    disponible: body.disponible,
    categoria: body.categoria,
    usuario: req.usuario._id // se obtiene del verificatoken
  });

  producto.save( ( err, productoDB ) => {

    if ( err ) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if( !productoDB) {
      return res.status(400).json( {
        ok: false,
        err
      } );
    }
     
    res.status(200).json({
      ok: true,
      producto: productoDB
    });
  });

});

app.put('/producto/:id', verificaToken, (req, res) => { 

  let id = req.params.id;
  let body = req.body;

  // Verificar si existe
  Producto.findById( id, ( err, productoDB) => {

    if ( err ) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if ( !productoDB ) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'El ID no es correcto'
        }
      });
    }

    productoDB.nombre = body.nombre;
    productoDB.precioUni = body.precioUni;
    productoDB.categoria = body.categoria;
    productoDB.disponible = body.disponible;
    productoDB.descripcion = body.descripcion;

    productoDB.save( ( err, productoGuardado) => {
      if ( err ) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.status(200).json( {
        ok:true,
        producto: productoGuardado
      });

    });

  });
});

app.delete('/producto/:id', verificaToken, (req, res) => {

  let id = req.params.id;

  Producto.findById(id, (err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!productoDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'El ID no es correcto'
        }
      });
    }

    // Si encuentra el id entonces cambiar disponible a false
    productoDB.disponible = false;

    // Actualizar disponible
    productoDB.save( ( err, productoBorrado ) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.status(200).json({
        ok: true,
        producto: productoBorrado,
        message: 'Producto borrado'
      });
    });
  });
});
module.exports = app;