import { createContext, useEffect, useState } from 'react';
import { AuthContextDataProps, AuthContextProviderProps } from './types';
import { UserDTO } from '@dtos/user';
import { api } from '@services/api';
import { getStoredUserData, storeUserData } from '@storage/user';

export const AuthContext = createContext({} as AuthContextDataProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });
      if (data.user) {
        setUser(data.user);
        await storeUserData(data.user);
      }
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    const userLogged = await getStoredUserData();

    if (!!userLogged) {
      setUser(userLogged);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
