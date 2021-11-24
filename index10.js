// 120 Ordenando las rutas en nuestro servidor
// Configuración a que cargue todas las rutas

const { response } = require("./server/routes/usuario");

// 121 Login de usuario
// request.body
// verificar error 500 error internal
// Verificar correo existe
// Verificar contraseña

// 122 Generar un JWT
// npm install jsonwebtoken --save
// let token = jwt.sign(payload, secretOrPrivateKey, { dias por expirar}) payload es un objeto
// En postMan se crea el token. ir a jwt.io y pegar el token para que lo Decoded
// indica que es Invalid Signature debido al SECRETORPRIVATEKEY

// 123 Proteger rutas mediante uso de Token - Middlewares
// Pasar el token a los usuarios
// Existen varias maneras de pasar el token
// Por Url {{url}}/usuario?limite=5&desde=0&token=fefefeferferferfer
// La otra forma y la que se trabajará es en los Headers de la solicitud  mandar la palabra token
// Ir PostMan - get - usuario - Headers - token - value
// crear un middleware personalizado autenticacion
// app.get('/usuario', verificaToken, function (req, res) {
// notar que no se esta llamando a la función. Se esta indicando que es el Middleware que se va a disparar cuando quiera accesar o se quiera revisar la ruta
// verificar que el token sea valido con jwt.verify

// 124 Obtener información del Payload en cualquier servicio
// PAYLOAD es el contenido email por ejemplo
// Verificar que el token pasa por get put post delete
// PostMan agregar en Headers - token - {{token}}
// app.get('/usuario', verificaToken, function (req, res) {


//   return res.json({
//     usuario: req.usuario,
//     email: req.usuario.email
//   })

// 126 Pro Tip Variables de entorno automáticas – Postman
// Al hacer petición de Login ,  este genera un token. Se quiere leer el token y automaticamente llegar a variable de entorno desarrollo y producción y actualizar el valor del token
// Pestaña Pre-request Script (Antes de que se envié la petición)
// Pestaña Tests (Son Respuestas que se pueden ejecutar automaticamente cuando hay una respuesta )
// PostMan - {{url}}Login - tests 
//console.log('hola mundo')
//para ver el log ir a Menú - View - Show PostMan Console
// Ir Tests buscar Snnipets Set an environment variable
// pm.environment.set("variable_key", "variable_value");
// let token = pm.response.json();
// console.log(pm.response.json())
// El log muestra el usuario y el token 
// Para almacenar solo el token
// let respuesta = pm.response.json();
// console.log(pm.response.json())
// if( respuesta.ok ) {
//     let token = respuesta.token;
//     pm.environment.set("token", token);
// } else {
//     console.log('No se actualizo el token');
// }