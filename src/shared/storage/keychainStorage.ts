import * as Keychain from 'react-native-keychain';

export const keychainStorage = {
  getItem: async (key: string) => {
    const result = await Keychain.getGenericPassword({ service: key });
    return result ? result.password : null;
  },
  setItem: async (key: string, value: string) => {
    await Keychain.setGenericPassword('token', value, { service: key });
  },
  removeItem: async (key: string) => {
    await Keychain.resetGenericPassword({ service: key });
  },
};