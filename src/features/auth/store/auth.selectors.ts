import type { RootState } from '@/shared/store';

export const selectUser = (state: RootState) => state.authUser.user;
export const selectIsLoggedIn = (state: RootState) =>
  !!state.authUser.user && !!state.authToken.accessToken;
export const selectAccessToken = (state: RootState) =>
  state.authToken.accessToken;
export const selectRefreshToken = (state: RootState) =>
  state.authToken.refreshToken;
