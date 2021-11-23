const { dbConnection } = require('./config/config');
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser')

const app = express();

dbConnection();

 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuario'))


app.listen( process.env.PORT, () => {
  console.log(' Escuchando el puerto', process.env.PORT);
});