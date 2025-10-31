const dotenv = require('dotenv');
const connectDB = require('./config/db');
const syncCosmetics = require('./jobs/syncCosmetics');

// Carrega as variáveis de ambiente
dotenv.config();

const run = async () => {
  // Conecta ao banco de dados
  await connectDB();

  // Executa a sincronização
  await syncCosmetics();

  // Fecha a conexão para o script terminar
  process.exit(0);
};

run();
