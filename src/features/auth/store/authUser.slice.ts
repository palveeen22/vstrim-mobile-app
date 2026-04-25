import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types/auth.types';

interface AuthUserState {
  user: User | null;
}

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: { user: null } as AuthUserState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, updateUser, clearUser } = authUserSlice.actions;
export default authUserSlice.reducer;
