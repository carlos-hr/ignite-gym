import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_TOKEN_STORAGE } from '@storage/config';

export async function storeAuthToken(token: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
}

export async function getStoredAuthToken() {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

  return token;
}

export async function deleteStoredAuthToken() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}
