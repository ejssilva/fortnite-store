require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');

// Rotas
const userRoutes = require('../routes/userRoutes');
const cosmeticRoutes = require('../routes/cosmeticRoutes');

// Conectar ao banco de dados
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste principal
app.get('/', (req, res) => {
  res.send('<h1>API do Fortnite Store</h1><p>Backend está no ar no Render!</p>');
});

// Rotas da API
app.use('/users', userRoutes);
app.use('/cosmetics', cosmeticRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app; // Mantemos isso para compatibilidade, embora o Render não use
