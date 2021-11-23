// PUerto
// process.env.PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

const dbConnection = async() => {
  try {
    await mongoose.connect( process.env.DB_CNN, 
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // usecreateindex is not supported
        // useCreateIndex: true
      });
      console.log('DB Online'); 
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de inicializar BD');

  }
}

module.exports = {
  dbConnection
}

