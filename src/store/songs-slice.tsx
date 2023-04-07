import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSongFormVisible: false,
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    openSongForm(state) {
      state.isSongFormVisible = true;
    },
    closeSongForm(state) {
      state.isSongFormVisible = false;
    },
  },
});

export const songsActions = songsSlice.actions;
export const songsReducer = songsSlice.reducer;
