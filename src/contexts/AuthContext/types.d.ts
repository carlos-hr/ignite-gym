import { UserDTO } from '@dtos/user';
import { ReactNode } from 'react';

export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  user?: UserDTO;
}
