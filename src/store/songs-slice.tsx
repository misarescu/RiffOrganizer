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
  sections: Array<SectionType>;
};

type SongsInitialStateType = {
  isSongFormVisible: boolean;
  songList: Array<SongType>;
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
    setSongList(state, action) {
      state.songList = action.payload.songList;
    },
    updateSection(
      state: SongsInitialStateType,
      action: { type: string; payload: SectionType }
    ) {
      const songLength = state.songList.length;
      for (let i = 0; i < songLength; i++) {
        const sectionLength = state.songList[i].sections.length;
        for (let j = 0; j < sectionLength; j++) {
          if (state.songList[i].sections[j].id === action.payload.id) {
            state.songList[i].sections[j] = action.payload;
          }
        }
      }
    },
  },
});

export const songsActions = songsSlice.actions;
export const songsReducer = songsSlice.reducer;
