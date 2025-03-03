import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SoundState {
  enabled: boolean;
  volume: number;
}

const initialState: SoundState = {
  enabled: true,
  volume: 0.5,
};

const soundSlice = createSlice({
  name: 'sound',
  initialState,
  reducers: {
    toggleSound: (state) => {
      state.enabled = !state.enabled;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
  },
});

export const { toggleSound, setVolume } = soundSlice.actions;

export default soundSlice.reducer;