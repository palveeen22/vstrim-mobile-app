// store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { keychainStorage } from '@/shared/storage/keychainStorage';
import authUserReducer from '@/features/auth/store/authUser.slice';
import authTokenReducer from '@/features/auth/store/authToken.slice';
import mapReducer from '@/features/map/store/map.slice';

const rootReducer = combineReducers({
  // User profile — AsyncStorage (non-sensitive)
  authUser: persistReducer(
    {
      key: 'auth-user',
      storage: AsyncStorage,
      whitelist: ['user'],
    },
    authUserReducer,
  ),

  // Token — Keychain (sensitive, encrypted iOS Secure Enclave)
  authToken: persistReducer(
    {
      key: 'auth-token',
      storage: keychainStorage,
      whitelist: ['accessToken', 'refreshToken'],
    },
    authTokenReducer,
  ),

  // UI state — not persisted
  map: mapReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;