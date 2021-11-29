const jwt = require('jsonwebtoken');

// Verificación del token

// Recibe 3 argumentos
// La tarea de esta función es leer el Headers -token

let verificaToken = ( request, respond, next ) => {

  // Leer el Headers - token
  let token = request.get('token');

  jwt.verify( token, process.env.SECRETORPRIVATEKEY, ( err, decoded ) => {

    if ( err ) {
      return respond.status(401).json( { 
        ok: false,
        err
      } );
    }

    request.usuario = decoded.usuario;

    next();
  });

  // respond.json( {
  //   token: token
  // })

};

let verificaTokenImagen = ( request, respond, next ) => {

  // token por query
  let token = request.query.token;

  jwt.verify( token, process.env.SECRETORPRIVATEKEY, ( err, decoded ) => {

    if ( err ) {
      return respond.status(401).json( { 
        ok: false,
        err
      } );
    }

    // request.usuario = decoded.usuario;

    next();
  });
};


// Verifica ADMIN_ROLE
let verificaAdmin_Role = ( request, respond, next ) => {

  let usuario = request.usuario;

    if ( usuario.role === 'USER_ROLE') {      
      return respond.json( {
        ok:false,
        err: {
          message: 'El usuario no es administrador'
        }
      })
    }

    if (usuario.role === 'ADMIN_ROLE') {
      next();
      return;
    }

};
// anfn arrow function
module.exports = {
  verificaToken,
  verificaAdmin_Role,
  verificaTokenImagen
}