const express = require('express');
const fs = require('fs');
const path = require('path');
const { verificaTokenImagen } = require('../middlewares/autenticacion');


const app = express();

app.get('/imagen/:tipo/:img', verificaTokenImagen, (req, res) => {

  const tipo = req.params.tipo;
  const img = req.params.img;
  // let pathImg = `./uploads/${tipo}/${img}`;

  let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);

  // Si existe el pathImagen
  if ( fs.existsSync( pathImagen ) ) {
    // Enviar
    res.sendFile( pathImagen );
  } else {

    // path absoluto.  
    let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg');
  
    res.sendFile( noImagePath );
    // res.sendFile( `./assets/no-image.jpg` );
  }

});

module.exports = app;