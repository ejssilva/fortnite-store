const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Conecta ao banco de dados
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Configuração de CORS para permitir requisições do frontend
const corsOptions = {
  // A porta 5173 é o padrão do Vite (React). Mude se a sua for diferente.
  origin: 'http://localhost:5173', 
  optionsSuccessStatus: 200
};

// Habilita o CORS com as opções especificadas
app.use(cors(corsOptions ));

// Middlewares para aceitar JSON no corpo das requisições
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('<h1>API do Fortnite Store</h1><p>Backend está no ar!</p>');
});

// Rotas da API
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/cosmetics', require('./routes/cosmeticRoutes'));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
