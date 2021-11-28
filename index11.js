// 11 Google Sign In - Front y BackEnd
// Temas de la sección: 

// 129 Introducción a la sección
// Un usuario ingrese a la pagina web. Aparece el Modal de Google Sign In. Esa info nos genera un token. El token será enviado al Backend Server. Lo procesa y es valido. Si el usuario no existe lo crea. Si el usuario existe entonces genera un nuevo token para que pueda ser usado para validar estos servicios.
// Usaremos google sign in solo para verificar que el usuario es valido.
// Configuracion la consola developers de google. Para que funcione local y produccion

// Aquí cubriremos varios temas como: 

// Generar API Key de Google
// Generar API Secret
// Usar librerías de Google para la validación de tokens
// Tips importantes en PostMan
// Despliegues a Heroku
// Uso del Google SignIn en el Front-End
// Crear usuarios personalizados en base a respuestas de Google

// 131 Link para comenzar nuestra integración de Google Sign-In

// Ruta usando path path.resolve( __dirname , '../public')
// Crear en public index.html para agregar el script de Google Sign-In.
// página para la integración de Google Sign-In.
// https://developers.google.com/identity/sign-in/web/sign-in
// Go to the Credentials page.
// Pantalla de consentimiento de OAuth
// Crear Credenciales ID de clientes OAuth 2.0
// 
// 132 Obtención del API Key y API Secret de Google
// Se obtiene información de la cuenta de Google. Pero esto no se manda al Backend Server.
// ID: 116045703183118959834
// (index):26 Name: humberto Valenzuela
// (index):27 Image URL: https://lh3.googleusercontent.com/a/AATXAJwAToEBD1ZS0duK3GsddfpCbmIMOigmu3JL_QGj=s96-c
// (index):28 Email: hvg.informatico@gmail.com

// Google genera el token de identificación.
// https://developers.google.com/identity/sign-in/web/sign-in
// opción Autenticarse con un servidor backend
// var id_token = googleUser.getAuthResponse().id_token;
// Ver devtools para ver el token. Este token lo válida con una librería de Google.
// envíe el token de ID a su servidor con una solicitud HTTPS POST
// Using a Google API Client Library
// npm install google-auth-library --save
// login: colocar la función.
// Ver resultado en la terminal

// 134 Crear un usuario personalizado en base a las credenciales de Google
// Se imprime en la terminal payload.name email picture
// La función verify regresa una promesa.
// Return objeto personalizado
// Cuando se hace un post de google se recibe idtoken. se llama a verify. Si tiene un error token invalido no se ejecuta,entra en el catch con status(403).
// Si es correcta googleUser obtiene la info del usuario.
// Llamar al Schema de Usuario.findOne para buscar verificar si en la bd tiene un usuario con ese email. Si existe el usuario y no se a autenticado por google, quiere decir que uso el correo normal en el método de autenticación, es decir, el coloco el usuario y contraseña.
// Entonces no debe ser permitido dando un mensaje Debe usar su autenticacion normal.
// De lo contrario si el usuario se autentico por google entonces renueva el token. y se regresa respuesta.json
// De lo contrario, es el caso de que sea la primera vez que ese usuario se esta autenticando.

// 135 Probar Google Sign-In desde Postman
//Post {{url}}/google - Body - x-www-form-urlencoded
// key idtoken nombrado en el html
// let token = request.body.idtoken;


// 136 Pro Tip Generar la documentacion automatica de nuestros servicios
// Postman: generacion de documentacion de servicios REST 
// clic en la carpeta 08RESTServerConfiginiciales - sección derecha documentation - 
// View complete collection documentation
// botón publish - se abrirá una página web - boton publish

// 137 Publicar a Heroku y GitHub - Y pruebas en producción
// git status
// git add .
// git commit -m "Google Sing-in"
// git push 
// git push heroku master
// En google
// https://console.cloud.google.com/apis/credentials/oauthclient/904817232097-ilv364veqeclfajgoqvhh6dd1l0vj68q.apps.googleusercontent.com?project=valued-night-333102
// Credenciales - Agregar URI - https://intense-springs-10581.herokuapp.com/
// tendría entonces una para localhost y otra para heroku

// {
//   "error": "idpiframe_initialization_failed",
//   "details": "Not a valid origin for the client: https://intense-springs-10581.herokuapp.com has not been registered for client ID 904817232097-ilv364veqeclfajgoqvhh6dd1l0vj68q.apps.googleusercontent.com. Please go to https://console.developers.google.com/ and register this origin for your project's client ID."
// }

