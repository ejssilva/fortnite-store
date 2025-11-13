import axios from 'axios';

// Em produção no Vercel, o frontend e o backend estarão no mesmo domínio.
// Podemos usar uma URL relativa.
const apiClient = axios.create({
  baseURL: '/api',
});

export default apiClient;
