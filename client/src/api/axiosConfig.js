import axios from 'axios';

// Cria uma instância do axios com a URL base da nossa API backend
const apiClient = axios.create({
  baseURL: 'http://localhost:5001/api', // A porta deve ser a mesma do seu backend
} );

export default apiClient;
