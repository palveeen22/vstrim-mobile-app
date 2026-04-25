// shared/api/client.ts
import axios from 'axios';
import { Config } from '@/shared/constants/config';
import { store } from '@/shared/store';
import { setTokens, clearTokens } from '@/features/auth/store/authToken.slice';
import { clearUser } from '@/features/auth/store/authUser.slice';

export const apiClient = axios.create({
  baseURL: Config.API_URL,
  timeout: 10_000,
});

// Inject token dari Redux store (bukan dari Keychain langsung)
apiClient.interceptors.request.use((config) => {
  const token = store.getState().authToken.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto refresh
let isRefreshing = false;
let failedQueue: Array<{ resolve: Function; reject: Function }> = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        original.headers.Authorization = `Bearer ${token}`;
        return apiClient(original);
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = store.getState().authToken.refreshToken;
      const { data } = await axios.post(`${Config.API_URL}/auth/refresh`, {
        refreshToken,
      });

      store.dispatch(
        setTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        }),
      );

      processQueue(null, data.accessToken);
      original.headers.Authorization = `Bearer ${data.accessToken}`;
      return apiClient(original);
    } catch (err) {
      processQueue(err, null);
      // Logout — clear semua
      store.dispatch(clearTokens());
      store.dispatch(clearUser());
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);