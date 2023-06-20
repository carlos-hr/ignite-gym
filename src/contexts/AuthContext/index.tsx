import { createContext, useEffect, useState } from 'react';
import { AuthContextDataProps, AuthContextProviderProps } from './types';
import { UserDTO } from '@dtos/user';
import { api } from '@services/api';
import {
  deleteStoredUser,
  getStoredUserData,
  storeUserData,
} from '@storage/user';
import {
  deleteStoredAuthToken,
  getStoredAuthToken,
  storeAuthToken,
} from '@storage/authToken';

export const AuthContext = createContext({} as AuthContextDataProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isFetchingUserData, setIsFetchingUserData] = useState(true);

  function setUserAndHeaders(userData: UserDTO, token: string) {
    setUser(userData);

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  async function storeUserAndToken(
    userData: UserDTO,
    token: string,
    refresh_token: string
  ) {
    try {
      await storeAuthToken(token, refresh_token);
      await storeUserData(userData);
    } catch (error) {
      throw error;
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setIsFetchingUserData(true);
      const { data } = await api.post('/sessions', { email, password });

      if (data.user && data.token && data.refresh_token) {
        setUserAndHeaders(data.user, data.token);

        await storeUserAndToken(data.user, data.token, data.refresh_token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsFetchingUserData(false);
    }
  }

  async function signOut() {
    try {
      setIsFetchingUserData(true);
      setUser({} as UserDTO);

      await deleteStoredUser();
      await deleteStoredAuthToken();
    } catch (error) {
      throw error;
    } finally {
      setIsFetchingUserData(false);
    }
  }

  async function updateUserProfile(updatedUser: UserDTO) {
    try {
      setUser(updatedUser);
      await storeUserData(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    try {
      setIsFetchingUserData(true);
      const userLogged = await getStoredUserData();
      const { token, refresh_token } = await getStoredAuthToken();

      if (!!userLogged && !!token) {
        setUserAndHeaders(userLogged, token);
        await storeUserAndToken(userLogged, token, refresh_token);
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

  useEffect(() => {
    const sub = api.registerInterceptTokenManager(signOut);

    return () => {
      sub();
    };
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{ isFetchingUserData, signIn, signOut, user, updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
