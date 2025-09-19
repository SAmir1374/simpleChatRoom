import axios from 'axios';
import { SelfStore } from '@/store/self';

export const AXIOS = axios.create({
  baseURL: 'http://localhost:3030/api/',
});

AXIOS.interceptors.request.use(
  (config) => {
    const { token } = SelfStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
