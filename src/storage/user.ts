import { UserDTO } from '@dtos/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_STORAGE } from './config';

export async function storeUserData(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function getStoredUserData() {
  const storage = await AsyncStorage.getItem(USER_STORAGE);

  const user: UserDTO = storage ? JSON.parse(storage) : {};
  return user;
}
