import axios from 'axios';
import { getAccessToken } from './localStorageService';

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      alert(token);
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    Promise.reject(error)
  }
);
