import axios from 'axios';

// Em produção no Render, o frontend e o backend estão em domínios diferentes.
// Precisamos usar a URL completa do backend.
const apiClient = axios.create({
  baseURL: 'https://fortnite-store-backend.onrender.com',
} );

export default apiClient;
