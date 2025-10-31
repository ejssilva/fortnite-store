const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// --- INÍCIO DA CORREÇÃO DE CORS ---

// Configuração de CORS
const corsOptions = {
  // Substitua pela URL onde seu frontend React está rodando.
  // O Vite geralmente usa a porta 5173 por padrão.
  origin: 'http://localhost:5173', 
  optionsSuccessStatus: 200 // Para navegadores legados
};

// Habilita o CORS com as opções especificadas
app.use(cors(corsOptions ));

// --- FIM DA CORREÇÃO DE CORS ---


// Middlewares
// app.use(cors()); // A linha original será substituída pela configuração acima
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
