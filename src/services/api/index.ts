import { AppError } from '@utils/appError';
import { APIInstanceProps } from './types';
import axios from 'axios';
import { getStoredAuthToken } from '@storage/authToken';

export const api = axios.create({
  baseURL: 'http://192.168.2.112:3333',
}) as APIInstanceProps;

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error?.response.status === 401) {
        if (
          error.response.data?.message === 'token.expired' ||
          error.response.data?.message === 'token.invalid'
        ) {
          const { refresh_token } = await getStoredAuthToken();

          if (!refresh_token) {
            signOut();
            return Promise.reject(error);
          }
        }

        signOut();
      }

      if (error.response && error.response.data) {
        const { message } = error.response.data;

        return Promise.reject(new AppError(message));
      }

      return Promise.reject(error);
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};
