import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthTokenState {
  accessToken: string | null;
  refreshToken: string | null;
}

const authTokenSlice = createSlice({
  name: 'authToken',
  initialState: { accessToken: null, refreshToken: null } as AuthTokenState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setTokens, clearTokens } = authTokenSlice.actions;
export default authTokenSlice.reducer;
