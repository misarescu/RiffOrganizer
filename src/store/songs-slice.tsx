import { createSlice } from '@reduxjs/toolkit';

type SectionType = {
  id: string;
  name: string;
  status: string;
};

type SongType = {
  id: string;
  artist_name: string;
  song_name: string;
  sections: SectionType[];
};

type SongsInitialStateType = {
  isSongFormVisible: boolean;
  songList: SongType[];
};

const initialState: SongsInitialStateType = {
  isSongFormVisible: false,
  songList: [],
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
