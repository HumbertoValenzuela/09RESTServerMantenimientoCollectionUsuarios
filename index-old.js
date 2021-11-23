// 088 Introducción a la sección
// CRUD de collection usuarios
// password encriptada, hash de una sola vía
// Inicialización de variables de entorno en Heroku. Con esto las variables estarán protegidas cuando se suban a GitHub
// nlab es un servicio que entrega 500Mb de espacio para poner una BD. Nlab ayuda a la config de la bd. nlab tiene una conexión a Amazon Web Services

// Aquí cubriremos varios temas como: 

// Definir los alcances de nuestro RESTServer
// CRUD
// Encriptación de contraseñas
// Validaciones personalizadas
// Creación de roles
// Conexiones con MLAB
// Despliegue de base de datos en la nube
// Conexión con Robo 3T con base de datos en la nube
// Configuración de variables de entorno
// Borrado de archivos
// Eliminado físico de la base de datos
// Eliminación por estado en un campo de la colección

// 091 Mongoose - Conectarnos a la base de datos
// Asegurar que mongo este corriendo
// mongo d para saber el ´puerto 27017
// npm install mongoose --save
// server.js arriba de app.listen

// 095 Validaciones personalizadas - email y role
// Para que sea el resultado más fácil de usar
// npm i mongoose-unique-validator --save
// 

// 096 Nota de actualización – Bcrypt
// 097 Bcrypt - Encriptando la contraseña
// Método hash de una sola vía. significa que el usuario aunque obtenga la contraseñahasheada no será posible reconstruir
// npm i bcrypt --save
// La respuesta POST no se necesita toda la respuesta  usuario: usuarioDB
// Entonces en models usuario crear función para quitarlo

// 098 PUT Actualizar información del usuario

  // Usuario.findById( id, (err, usuarioDB) => {
  //   usuarioDB.save()
  // }) 

// { new: true} retorna lo que se actualizo

 // Funciona pero actualiza todo debido a que no tiene validación.
  // Usuario.findByIdAndUpdate( id, body, ( err, usuarioDB ) => {
  //   if ( err ) {
  //     return res.status( 400 ).json( {
  //       ok: false,
  //       err
  //     });
  //   }
  //   res.json({ 
  //     //id //id: id "id": "123456"
  //     ok: true,
  //     usuario: usuarioDB
  //   })
  // })

  // 099 Validaciones adicionales en el PUT
// método de mongoose runValidators
// Con esto al realizar PUT rol no podrá cambiar
// Validar que password y google no se modifique
// Node.js: npm install underscore --save
// pick: retorna una copia del objeto, filtrando solo los valores por la listaBlanca 

// 100 GET Obtener todos los usuarios de forma paginada
// {{url}}/usuario?limite=2&desde=3

// 101 Retornar número total de registros en una colección
// count recibe una condición, recibe el error y el callback que es el conteo
// Contar por un registro como google.true
// Usuario.find( {{ google: true}} )
// Usuario.count( { google: true}, ( err, conteo ) => {
  // Contar todo
  //  Usuario.count( {}, ( err, conteo ) => {

// 102 Filtrando los campos de los resultados de un get
// Mostrar nombre correo y excluyendo campos
// Usuario.find( {}, que campos o propiedades queremos mostrar ) 
// Usuario.find( {}, 'nombre, email' )

// 103 Delete Borrando un usuario de la base de datos
// Se realiza dos formas de realizar el delete
// Primero borrando el registro de la bd
// obtener params.id 
// método mongoose findByIdAndRemove
// if status si ocurre un error
// res.json resultado en formato json
// Al borrar el mismo id entrega resultado null
// Evaluar si viene un usuario borrado



// 104 Delete Marcar una eliminación en el mismo registro
// Manejar el estado true mostrar false no mostrar
// Pero seguirá estando el registro en la bd para seguir teniendo la integridad referencial
// Modificar el GET usuario y que muestre el listado con el filtro estado: true