const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../config/db'); // O caminho mudou

dotenv.config();
connectDB();

const app = express();

// A configuração de CORS precisa ser mais permissiva em produção
app.use(cors()); 

app.use(express.json());

// Rotas da API (os caminhos mudaram)
app.use('/api/users', require('../routes/userRoutes'));
app.use('/api/cosmetics', require('../routes/cosmeticRoutes'));

// Rota de teste para verificar se a API está no ar
app.get('/api', (req, res) => {
  res.send('<h1>API do Fortnite Store</h1><p>Backend está no ar no Vercel!</p>');
});

// IMPORTANTE: Não chame app.listen()
// Exporte o app para o Vercel usar
module.exports = app;
