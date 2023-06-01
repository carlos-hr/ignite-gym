import { createContext } from 'react';
import { AuthContextDataProps, AuthContextProviderProps } from './types';

export const AuthContext = createContext({} as AuthContextDataProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
