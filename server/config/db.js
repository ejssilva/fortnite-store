const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Acessa a variável de ambiente MONGO_URI
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Opções para evitar warnings no console
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erro ao conectar com o MongoDB: ${error.message}`);
    // Encerra o processo com falha
    process.exit(1);
  }
};

module.exports = connectDB;
