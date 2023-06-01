import { UserDTO } from '@dtos/user';
import { ReactNode } from 'react';

export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  user?: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
}