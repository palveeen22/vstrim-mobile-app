import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface MapState {
  selectedPinId: string | null;
  activeCategory: string | null;
}

const mapSlice = createSlice({
  name: 'map',
  initialState: { selectedPinId: null, activeCategory: null } as MapState,
  reducers: {
    selectPin: (state, { payload }: PayloadAction<string | null>) => {
      state.selectedPinId = payload;
    },
    setCategory: (state, { payload }: PayloadAction<string | null>) => {
      state.activeCategory = payload;
    },
  },
});

export const { selectPin, setCategory } = mapSlice.actions;
export default mapSlice.reducer;
