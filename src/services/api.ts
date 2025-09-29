import { AppError } from '@utils/AppError';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.107:3333',
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.data) {
      console.log('🚀 ~ error.response.data:', error.response.data.message);
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  }
);

export { api };
