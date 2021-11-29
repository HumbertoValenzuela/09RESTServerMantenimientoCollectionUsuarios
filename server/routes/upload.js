const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const app = express();

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

// default options
app.use(fileUpload());

// app.put('/upload', function(req, res) {
app.put('/upload/:tipo/:id', function(req, res) {

    let tipo = req.params.tipo;
    let id = req.params.id;

  // Si no hay archivos mandar mensaje
  if (!req.files || Object.keys(req.files).length === 0) {
    // return res.status(400).send('No files were uploaded.');
    return res.status(400).json( {
      ok: false,
      err: {
        message: 'No se a seleccionado ningún archivo'
      }  
    });
  }

  // Validar Tipo=======================================================
  // /upload/:tipo/:id
  let tiposValidos = ['productos', 'usuarios'];
  if ( tiposValidos.indexOf( tipo ) < 0 ) {
    return res.status(400).json( {
      ok: false,
      err: {
        message: 'Tipos permitidos: ' + tiposValidos.join(', ')
      }
    });
  }

  // ===============================================================
  //subirArchivo viene de un input field, en PostMan - body - subirArchivo 
  let subiendoArchivo = req.files.subirArchivo;

  // Extensiones válidas
  let extensionesValidas = [ 'png', 'jpg', 'gif', 'jpeg'];
  let subiendoArchivoSinExtensión = subiendoArchivo.name.split('.');
  // Obtener la última posición
  let obtenerExtensionImagen = subiendoArchivoSinExtensión[subiendoArchivoSinExtensión.length - 1];

  // console.log(subiendoArchivoSinExtensión)
  // console.log(extension)
  // return;

  // indexOf para buscar en el Array
  if ( extensionesValidas.indexOf( obtenerExtensionImagen ) < 0 ) {
    return res.status(400).json( {
      ok: false,
      err: {
        message: 'La extensión permitida' + extensionesValidas.join(', ')
      }
    })
  }
  // Cambiar nombre al archivo
  // 12341234nombreArchivo-999.jpg
  let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${obtenerExtensionImagen}`;


  // Use the mv() method para colocar el archivoen un lugar del server
  // subiendoArchivo.mv('uploads/filename.jpg', function(err) { 
    // subiendoArchivo.mv(`uploads/${tipo}/${subiendoArchivo.name}`, function(err) {
  subiendoArchivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {

    if (err) //Carpeta bloqueada, no existe carpeta o directorio
      return res.status(500).json({
        ok: false,
        err        
      });

      if ( tipo === 'productos') {
        imagenProducto(id, res, nombreArchivo);
      } 
      if (tipo === 'usuarios') {
          // Aqui, imagen cargada
        imagenUsuario(id, res, nombreArchivo);        
      }
      
      
    //   res.json({
    //     ok: true,
    //   message: 'Archivo Subido!'
    // });
  });

});

function imagenProducto(id, res, nombreArchivo) {
  
  // let body = _.pick( req.body,  ['nombre','email','img','role','estado']) ;
  let imagen = {
    img: nombreArchivo
  }; 

 
  Producto.findByIdAndUpdate( id, imagen, { new: false, runValidators: true}, ( err, productoDB ) => {
    if ( err ) {
      borraArchivo(nombreArchivo, 'productos');//borrar el actual
      return res.status( 500 ).json( {
        ok: false,
        err
      });
    }

    if ( !productoDB ) {
      borraArchivo(nombreArchivo, 'productos');//borrar el actual
      return res.status( 400 ).json( {
        ok: false,
        err: {
          message: 'Producto no existe'
        }
      });
    }

    borraArchivo(productoDB.img, 'productos');//borrar el anterior

    res.json({       
      ok: true,
      producto: productoDB,
      img: nombreArchivo
    });

  });

}

function imagenUsuario(id, res, nombreArchivo) {
  
  // let body = _.pick( req.body,  ['nombre','email','img','role','estado']) ;
  let imagen = {
    img: nombreArchivo
  }; 

 
  Usuario.findByIdAndUpdate( id, imagen, { new: false, runValidators: true}, ( err, usuarioDB ) => {
    if ( err ) {
      borraArchivo(nombreArchivo, 'usuarios');//borrar el actual
      return res.status( 500 ).json( {
        ok: false,
        err
      });
    }

    if ( !usuarioDB ) {
      borraArchivo(nombreArchivo, 'usuarios');//borrar el actual
      return res.status( 400 ).json( {
        ok: false,
        err: {
          message: 'Usuario no existe'
        }
      });
    }

    borraArchivo(usuarioDB.img, 'usuarios');//borrar el anterior

    res.json({       
      ok: true,
      usuario: usuarioDB,
      img: nombreArchivo
    });

  });

}

function borraArchivo(usuarioImagen, tipo){
  let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${usuarioImagen}`);
  // Confirmar si existe path
  if ( fs.existsSync(pathImagen) ) {
    // borrar
    fs.unlinkSync( pathImagen );
  }
}

module.exports = app;