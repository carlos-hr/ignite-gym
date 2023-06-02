import { createContext, useEffect, useState } from 'react';
import { AuthContextDataProps, AuthContextProviderProps } from './types';
import { UserDTO } from '@dtos/user';
import { api } from '@services/api';
import { getStoredUserData, storeUserData } from '@storage/user';

export const AuthContext = createContext({} as AuthContextDataProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isFetchingUserData, setIsFetchingUserData] = useState(true);

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
    try {
      const userLogged = await getStoredUserData();

      if (!!userLogged) {
        setUser(userLogged);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsFetchingUserData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, isFetchingUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
