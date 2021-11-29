// Temas de la sección: 

// Aquí cubriremos varios temas como: 

// Carga de archivos
// Validaciones de archivos
// Reubicar archivos
// Actualizar fotografía de un usuario
// Borrar archivos
// Cargar imágenes a los productos
// Servicio para mostrar y proteger imágenes
// Middleware para verificar token por URL
// Uso de dichas imágenes en el front-end

// 154 Nota sobre el fileupload-express
// Nota sobre el FileUpload
// En la próxima clase aprenderemos a subir archivos a nuestro servidor de express, hay que hacer una pequeña adición a la configuración a la función que llamamos para inicializar el FileUpload
// Así lo verán en la próxima clase
// app.use( fileUpload() );
// Pero hay que añadir lo siguiente
// app.use( fileUpload({ useTempFiles: true }) );
// Sino lo hacen, entonces sus archivos se subirán pero vacíos.

// 155 Subir archivos a Express
// Subir x cantidad de archivos, carga simultanea
// npm express-fileupload
// Crear carpeta uploads - para guardar archivos
// use fileUpload todos los archivos recaen en req.files
// Postman - uploads - Headers quitar token - Body - form-data - Key - opción Files - Seleccionar Archivo - Send
// "ok": false,
// "err": {
//     "errno": -4058,
//     "code": "ENOENT",
//     "syscall": "open",
//     "path": "C:\\uploads\\filename.jpg"
// }
// Path No encontrado
// Una forma simple quitar el path y solo dejar el archivo. Con esto se observará en que parte esta el path de inicio, con esa info crear el path. Lo subió en la raiz del proyecto

// 156 Validar la extension del archivo a subir
// Extensiones válidas
// indexOf para buscar en el Array
// Al guardar archivo imagen en el servidor el archivo debe ser único
// se debe de renombrar en el servidor.
// proximo capitulo asignar esta imagen a un registro de producto o usuario.
// Regresar la imagen para que el usuario la pueda ver

// 157 Ubicar y Renombrar archivos
// Se suben imagenes en la carpeta uploads. Para ordenar se crea carpeta usuarios y productos
// app.put para cargar las imagenes de usuario y producto
// agregar argumento :tipo (usuario o producto) /:id que usuario o que producto actualizar
// Obtener params req.params.tipo y el id;
// :tipo es oligatorio y :id
// Validación para restringir el tipo
// PostMan /upload/tiponopermitido/1234
// Debe entregar mensaje de validación
// Asignar un archivoImagen a un Registro
// para grabar se ocupa el Schema, con esto se tiene la info de métodos y propiedades
// Las carpetas y tipos con el mismo nombre para que hagan Match
// subiendoArchivo.mv(`uploads/${tipo}/${subiendoArchivo.name}`
// PostMan {{url}}/upload/usuarios/sdf y  {{url}}/upload/productos/sdf
// cambiar el nombre del archivo
// subiendoArchivo.mv(`uploads/${tipo}/${subiendoArchivo.name}`
// Nombre unico, adjuntar Date().getmilliseconds() para hacer unico y prevenir el cache del navegador

// 158 Actualizar imagen de usuario
// Usar el Schema Usuario, en lugar donde la imagen es cargada, crear la lógica. Crear función imagenUsuario verificar si el usuario que se quiere actualizar existe. buscar usuario findbyid - si existe un error - objeto res no existe en la función. enviar como parametro para utilizar en función. JS cuando son objetos siempre los pasa por referencia.
// La imagen cuando la guarda en el server. Si sucede un error en imagenUsuario la imagen sigue ahí. Se necesita borrar del server, para no tener archivo basura
// PostMan para prueba - {{url}}/upload/usuarios/619c37707a4dac9e4aaf8c23

// 159 Borrar archivos del servidor
// importar fs fileSystem
// importar Path
// Antes de borrar confirmar  path imagen existe
// upload.js se encuentra routes. Si se quiere hacer referencia a uploads/usuarios. Hacer referencia a dirname seguido de upload productos y usuarios
// Usuario.findByIdAndUpdate( id, imagen, { new: false,
// para que borre el usuariodb.img de la bd 
//  new: true, borra el archivo actual

// 160 Cargar imagen de productos – tarea

// 161 Servicio para mostrar las imágenes
// Mostrar con un servicio REST. porque todas las imagenes estan en el directoria uploads el cual NO es público
// crear un get imagen/:tipo/:img
// obtener los valores req.params.tipo
// un path con la direccion `./uploads/${tipo}/${img}
// Validación un tipo que no existe una imagenes que no es de tipo imagen
// Server - assets - es una carpeta que contiene recursos estaticos o info que no es global estilos imagenes
// retornar el contenido de assets que no es pública. por lo que fisicamente se debe enviar al usuario
// res.sendFile: Está función lee el content type del archivo y regresa. Si es json o html o file lo regresa
// `./assets/no-image.jpg`
// PostMan - get {{url}}/imagen/tipo/foto
// TypeError: path must be absolute or specify root to res.sendFile
// El path debe ser absoluto o  especificado en sendFile
// __dirname Lugar donde se encuentra el archivo imagenes.js
// path.resolve(__dirname, '../assets/no-image.jpg');

// 162 Mostrar imagen de usuario o producto
// Crear servicio para que regrese la imagenes de los productos o usuario dependiendo de la solicitud sea
// path absoluto de uploads y path absoluto de assets
// fs.existsSync( pathImagen ) busca en la ruta los solicitado
// mostrar en el frontEnd
//* <img src="http://localhost:3000/imagen/usuarios/619c37707a4dac9e4aaf8c23-768.png" alt="" ></img> */}
// Proteger la imagen: Si alguien se sabe la dirección completa la podrá ver.
// Usar el verificatoken
// "message": "jwt must be provided"
// PostMan - Headers - agregar el token
// Pero al probar en el navegador da un error de   401 (Unauthorized)
// normalmente se manda el token en la direccion web como parte del url
// se modifica el middleware de verificación

// 163 Middleware Verificar token por url
// Mostrar la url de la imagen.
// este middleware valida el token usando el headers, 
// Pero hacerlo con el html como se tiene acá
//* <img src="http://localhost:3000/imagen/usuarios/619c37707a4dac9e4aaf8c23-768.png" alt="" ></img> */} */}
// se enviará por req.query
// ?token=1234&otra=asss&
// comienza con signo de interrogacion si tiene mas se agrega un &
// {{url}}/imagen/usuarios/619c37707a4dac9e4aaf8c23-768.png?token={{token}}
// Probar en el html agregando en duro el token

// 164 Desplegar en Heroku y backups en GitHub - Seccion 13
// git status
// git add .
// git status
// git commit -m "Manejo de archivos fs path"
// git push
// git push heroku master