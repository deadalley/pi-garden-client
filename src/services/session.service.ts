import AsyncStorage from '@react-native-async-storage/async-storage';

export class SessionService {
  static storeItem = async (key: string, value: string | number | object | boolean) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  static getItem = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
      return null;
    } catch (e) {
      console.error(e);
    }
  };

  static clearSession = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error(e);
    }

    console.log('Async Storage cleared.');
  };
}
