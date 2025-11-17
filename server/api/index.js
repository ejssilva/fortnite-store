// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');

// Importa as rotas
const userRoutes = require('../routes/userRoutes');
const cosmeticRoutes = require('../routes/cosmeticRoutes');

// Executa a conexão com o banco de dados
connectDB();

// Cria a instância do aplicativo Express
const app = express();

// Aplica os middlewares
// Aplica os middlewares

// Configuração explícita do CORS para permitir requisições do nosso frontend
const corsOptions = {
  origin: 'https://fortnite-store-frontend.onrender.com',
  optionsSuccessStatus: 200 // Necessário para alguns navegadores mais antigos
};
app.use(cors(corsOptions ));

app.use(express.json());


// --- ROTAS ---

// Rota principal para verificar se o servidor está no ar
app.get('/', (req, res) => {
  res.send('<h1>API do Fortnite Store</h1><p>Backend está no ar no Render!</p>');
});

// Rota para os usuários (ex: /users/register, /users/login)
app.use('/users', userRoutes);

// Rota para os cosméticos (ex: /cosmetics)
app.use('/cosmetics', cosmeticRoutes);


// --- INICIALIZAÇÃO DO SERVIDOR ---

// Define a porta. O Render fornecerá a porta através de process.env.PORT
const PORT = process.env.PORT || 3001; // Usamos 3001 como padrão local

// Inicia o servidor e o faz "ouvir" na porta definida

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});