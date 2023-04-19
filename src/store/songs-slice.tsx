import { createSlice } from '@reduxjs/toolkit';
import { Database } from '../API/dbTypes';

export type SectionType = Database['public']['Tables']['sections']['Row'];
export type SongType = Database['public']['Tables']['songs']['Row'] & {
  sections: Array<SectionType>;
};

export type SongsInitialStateType = {
  isSongFormVisible: boolean;
  isSectionFormVisible: boolean;
  activeSongToAddSection: string;
  songFilter: string;
  songList: Array<SongType>;
};

const initialState: SongsInitialStateType = {
  isSongFormVisible: false,
  isSectionFormVisible: false,
  activeSongToAddSection: '',
  songFilter: '',
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

    openSectionForm(state, action) {
      state.isSectionFormVisible = true;
      state.activeSongToAddSection = action.payload;
    },

    closeSectionForm(state) {
      state.isSectionFormVisible = false;
      state.activeSongToAddSection = '';
    },

    setSongList(state, action) {
      state.songList = action.payload.songList;
    },

    addSong(state, action) {
      state.songList.unshift(action.payload);
    },

    removeSong(state, action) {
      let idx = -1;
      const songLength = state.songList.length;
      for (let i = 0; i < songLength; i++) {
        if (state.songList[i].id === action.payload.id) idx = i;
      }
      if (idx >= 0) state.songList.splice(idx, 1);
    },

    // TODO: make asyncThunk
    addSections(
      state: SongsInitialStateType,
      action: { type: string; payload: SectionType[] }
    ) {
      const songIdx = state.songList.findIndex(
        (song) => song.id === state.activeSongToAddSection
      );
      const newSections = state.songList[songIdx].sections.concat(
        action.payload
      );
      state.songList[songIdx].sections = newSections;
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

    removeSection(
      state: SongsInitialStateType,
      action: { type: string; payload: SectionType }
    ) {
      const songLength = state.songList.length;
      for (let i = 0; i < songLength; i++) {
        const sectionLength = state.songList[i].sections.length;
        let idx = -1;
        for (let j = 0; j < sectionLength; j++) {
          if (state.songList[i].sections[j].id === action.payload.id) idx = j;
        }
        if (idx >= 0) state.songList[i].sections.splice(idx, 1);
      }
    },
    setSongFilter(
      state: SongsInitialStateType,
      action: { type: string; payload: string }
    ) {
      state.songFilter = action.payload;
    },
  },
});

export const songsActions = songsSlice.actions;
export const songsReducer = songsSlice.reducer;
