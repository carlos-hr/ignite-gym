import { AppError } from '@utils/appError';
import { APIInstanceProps, PromiseType } from './types';
import axios from 'axios';
import { getStoredAuthToken, storeAuthToken } from '@storage/authToken';

export const api = axios.create({
  baseURL: 'http://192.168.2.112:3333',
}) as APIInstanceProps;

const failedQueue: PromiseType[] = [];
let isRefreshing = false;

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

          const requestConfig = error.config;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token) => {
                  requestConfig.headers = { Authorization: `Bearer ${token}` };
                  resolve(api(requestConfig));
                },
                onFailure: (error) => {
                  reject(error);
                },
              });
            });
          }

          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post('/sessions/refresh-token', {
                refresh_token,
              });

              await storeAuthToken(data.token, data.refresh_token);

              if (requestConfig.data) {
                requestConfig.data = JSON.parse(requestConfig.data);
              }

              requestConfig.headers = { Authorization: `Bearer ${data.token}` };
              api.defaults.headers.common[
                'Authorization'
              ] = `Bearer ${data.token}`;

              failedQueue.forEach((req) => {
                req.onSuccess(data.token);
              });

              resolve(api(requestConfig));
            } catch (error: any) {
              failedQueue.forEach((req) => {
                req.onFailure(error);
              });

              signOut();
              reject(error);
            } finally {
              isRefreshing = false;
              failedQueue.splice(0, failedQueue.length);
            }
          });
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
