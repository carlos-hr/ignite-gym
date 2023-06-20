import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_TOKEN_STORAGE } from '@storage/config';

interface AuthData {
  token: string;
  refresh_token: string;
}

export async function storeAuthToken(token: string, refresh_token: string) {
  await AsyncStorage.setItem(
    AUTH_TOKEN_STORAGE,
    JSON.stringify({ token, refresh_token })
  );
}

export async function getStoredAuthToken() {
  const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

  const { token, refresh_token }: AuthData = response
    ? JSON.parse(response)
    : {};

  return { token, refresh_token };
}

export async function deleteStoredAuthToken() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}
