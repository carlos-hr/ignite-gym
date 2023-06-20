import { AxiosError, AxiosInstance } from 'axios';

type SignOut = () => void;

export interface APIInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

export interface PromiseType {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}
