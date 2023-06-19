import { AppError } from '@utils/appError';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.2.112:3333',
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.data) {
      const { message } = error.response.data;

      return Promise.reject(new AppError(message));
    }

    return Promise.reject(error);
  }
);
