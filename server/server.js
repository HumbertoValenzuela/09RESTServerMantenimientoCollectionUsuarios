const { dbConnection } = require('./config/config');
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

dbConnection();

 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// habilitar la carpeta public
app.use( express.static( path.resolve( __dirname , '../public')) );

// console.log(path.resolve( __dirname , '../public') )


// Configuración Global de Rutas
app.use( require( './routes/index' ) );


app.listen( process.env.PORT, () => {
  console.log(' Escuchando el puerto', process.env.PORT);
});