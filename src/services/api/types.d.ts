import { AxiosInstance } from 'axios';

type SignOut = () => void;

export interface APIInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
}
