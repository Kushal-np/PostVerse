import axios from 'axios';
import useAuthStore from '../stores/authStore';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    console.log('API request:', config.method, config.url, 'Token:', token); // Debug
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('API request error:', error.message); // Debug
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API response error:', error.response?.data || error.message); // Debug
    return Promise.reject(error);
  }
);

export default api;